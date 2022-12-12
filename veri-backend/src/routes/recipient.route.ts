import { Router } from 'express';
import RecipientController from '@controllers/recipient.controller';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import { CreateRecipientsDto } from '@/dtos/recipients.dto';
import validationMiddleware from '@/middlewares/validation.middleware';
import recipientMiddleware from '@/middlewares/recipient.middleware';

class RecipientsRoute implements Routes {
  public path = '/recipients';
  public router = Router();
  public recipientController = new RecipientController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      authMiddleware,
      this.recipientController.getRecipients
    );

    this.router.get(
      `${this.path}/:id(\\d+)`,
      authMiddleware,
      this.recipientController.getRecipient
    );

    this.router.post(
      `${this.path}/:id(\\d+)`,
      authMiddleware,
      recipientMiddleware('body', 'addresses'),
      validationMiddleware(CreateRecipientsDto, 'body'),
      this.recipientController.createRecipients
    );
  }
}

export default RecipientsRoute;
