import { HttpException } from '@exceptions/HttpException';
import { ValidateEventDto } from '@/dtos/event.dto';
import { Veris } from '@/models/veris.model';
import { Event } from '@/interfaces/events.interface';
import { Veri } from '@/interfaces/veris.interface';
import { compare } from 'bcryptjs';

class EventService {
  public async validate(eventData: ValidateEventDto): Promise<Event> {
    const findEvent: Veri = await Veris.query()
      .where('veris.event_name', '=', eventData.name)
      .first()
      .select();

    if (!findEvent) throw new HttpException(409, "Event doesn't exist");

    if (!findEvent.live_distribution)
      throw new HttpException(
        500,
        'Live distribution is not enabled for this event'
      );

    const isPasswordMatching: boolean = await compare(
      eventData.password,
      findEvent.live_distribution_password
    );

    if (!isPasswordMatching)
      throw new HttpException(409, 'Password is not matching');

    const event: Event = {
      id: findEvent.id,
      name: findEvent.event_name,
    };

    return event;
  }
}
export default EventService;
