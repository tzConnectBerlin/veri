import { CreateEventDto } from '@dtos/events.dto';
import { HttpException } from '@exceptions/HttpException';
import { Event } from '@interfaces/events.interface';
import { Events } from '@models/events.model';
import { isEmpty } from '@utils/util';

class EventService {
  public async findAllEvent(): Promise<Event[]> {
    const events: Event[] = await Events.query().select().from('events');
    return events;
  }

  public async findEventById(eventId: number): Promise<Event> {
    const findEvent: Event = await Events.query().findById(eventId);
    if (!findEvent) throw new HttpException(409, "Event doesn't exist");

    return findEvent;
  }

  public async createEvent(eventData: CreateEventDto): Promise<Event> {
    if (isEmpty(eventData)) throw new HttpException(400, 'eventData is empty');

    const findEvent: Event = await Events.query()
      .select()
      .from('events')
      .where('name', '=', eventData.name)
      .first();
    if (findEvent)
      throw new HttpException(
        409,
        `This event ${eventData.name} already exists`
      );

    const createEventData: Event = await Events.query()
      .insert({ ...eventData })
      .into('events');

    return createEventData;
  }

  public async updateEvent(eventId: number, eventData: Event): Promise<Event> {
    if (isEmpty(eventData)) throw new HttpException(400, 'eventData is empty');

    const findEvent: Event[] = await Events.query()
      .select()
      .from('events')
      .where('id', '=', eventId);
    if (!findEvent) throw new HttpException(409, "Event doesn't exist");

    await Events.query()
      .update({ ...eventData })
      .where('id', '=', eventId)
      .into('events');

    const updateEventData: Event = await Events.query()
      .select()
      .from('events')
      .where('id', '=', eventId)
      .first();
    return updateEventData;
  }

  public async deleteEvent(eventId: number): Promise<Event> {
    const findEvent: Event = await Events.query()
      .select()
      .from('events')
      .where('id', '=', eventId)
      .first();
    if (!findEvent) throw new HttpException(409, "Event doesn't exist");

    await Events.query().delete().where('id', '=', eventId).into('events');
    return findEvent;
  }
}

export default EventService;
