import { HttpException } from '@exceptions/HttpException';
import { ValidateEventDto } from '@/dtos/event.dto';
import { Event } from '@/interfaces/events.interface';
import { Veri } from '@/interfaces/veris.interface';
import { compare } from 'bcryptjs';
import findAllVeriWithPassword from '@services/helper/findAllVeriWithPassword';

class EventService {
  public async validate(eventData: ValidateEventDto): Promise<Event> {
    const allVeris: Veri[] = await findAllVeriWithPassword();
    const findEvent = allVeris.find((event) => {
      const urlArr = event.live_distribution_url.split('/');
      const eventPath = urlArr.at(urlArr.length - 1);
      return eventPath === eventData.name;
    });

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
