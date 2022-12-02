import { Veri } from '@/interfaces/veris.interface';
import { Veris } from '@/models/veris.model';
import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions/HttpException';
import { logger } from '../utils/logger';

const duplicateMiddleware = async (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const findVeri: Veri = await Veris.query()
    .select()
    .from('veris')
    .where('event_name', '=', req.body.event_name)
    .first();
  if (findVeri) {
    throw new HttpException(
      409,
      `Veri for this event ${req.body.event_name} already exists`
    );
  } else {
    next();
  }
};

export default duplicateMiddleware;
