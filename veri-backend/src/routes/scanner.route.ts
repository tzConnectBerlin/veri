import { Router } from 'express';
import RecipientController from '@controllers/recipient.controller';
import { Routes } from '@interfaces/routes.interface';
import { CreateRecipientsDto } from '@/dtos/recipients.dto';
import validationMiddleware from '@/middlewares/validation.middleware';
import recipientMiddleware from '@/middlewares/recipient.middleware';
import adminMiddleware from '@middlewares/admin.middleware';

class ScannerRoute implements Routes {
  public path = '/scan';
  public router = Router();
  public recipientController = new RecipientController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/:id(\\d+)`,
      adminMiddleware(),
      recipientMiddleware('body', 'addresses'),
      validationMiddleware(CreateRecipientsDto, 'body'),
      this.recipientController.createRecipients
    );
  }
}

export default ScannerRoute;
