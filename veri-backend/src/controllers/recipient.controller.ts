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

      res
        .status(200)
        .json({ data: findAllRecipientsData, message: 'findAllRecipients' });
    } catch (error) {
      next(error);
    }
  };

  public getRecipient = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const tokenId = Number(req.params.id);
      const findRecipientsData: Recipient[] =
        await this.RecipientService.findRecipientByTokenId(tokenId);

      res.status(200).json({ data: findRecipientsData, message: 'findbyVeri' });
    } catch (error) {
      next(error);
    }
  };

  public createRecipients = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = Number(req.user.id);
      const tokenId = Number(req.params.id);
      const addresses = req.body.addresses;
      const createRecipients: Recipient[] =
        await this.RecipientService.createRecipients(
          userId,
          tokenId,
          addresses
        );

      res.status(200).json({ data: createRecipients, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}

export default RecipientsController;
