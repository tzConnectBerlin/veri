import { Router } from 'express';
import EventController from '@/controllers/events.controller';
import { Routes } from '@interfaces/routes.interface';
import { ValidateEventDto } from '@/dtos/event.dto';
import validationMiddleware from '@/middlewares/validation.middleware';

class EventsRoute implements Routes {
  public path = '/events';
  public router = Router();
  public eventController = new EventController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      validationMiddleware(ValidateEventDto, 'body'),
      this.eventController.info
    );

    this.router.put(
      `${this.path}`,
      validationMiddleware(ValidateEventDto, 'body'),
      this.eventController.info
    );
  }
}

export default EventsRoute;
