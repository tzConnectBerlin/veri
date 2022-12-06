import { CustomRequest } from '@/interfaces/request.interface';
import { NextFunction, Response } from 'express';
import { Recipient } from '../interfaces/recipients.interface';
import RecipientService from '../services/recipients.service';

class RecipientsController {
  public RecipientService = new RecipientService();

  public getRecipients = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = Number(req.user.id);
      const findAllRecipientsData: Recipient[] =
        await this.RecipientService.findRecipients(userId);

      res.status(200).json({ data: findAllRecipientsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}

export default RecipientsController;
