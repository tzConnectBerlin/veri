import { Router } from 'express';
import RecipientController from '@controllers/recipient.controller';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';

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
  }
}

export default RecipientsRoute;
