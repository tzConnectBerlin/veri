import { ValidateEventDto } from '@/dtos/event.dto';
import { NextFunction, Request, Response } from 'express';
import EventService from '../services/events.service';
import { Event } from '../interfaces/events.interface';

class EventController {
  public eventService = new EventService();

  public info = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const eventData: ValidateEventDto = req.body;
      console.log(eventData);
      const eventInfo: Event = await this.eventService.validate(eventData);

      res.status(201).json({ data: eventInfo, message: 'eventinfo' });
    } catch (error) {
      next(error);
    }
  };
}

export default EventController;
