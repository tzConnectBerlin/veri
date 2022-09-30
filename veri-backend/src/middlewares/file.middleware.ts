import multer from 'multer';
import { RequestWithFile } from '@/interfaces/veris.interface';
import { Response, NextFunction } from 'express';
import { HttpException } from '@/exceptions/HttpException';

const fileMiddleware = async (
  req: RequestWithFile,
  res: Response,
  next: NextFunction
) => {
  const upload = multer().single('artwork');

  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      next(new HttpException(500, 'File upload error'));
    } else if (err) {
      next(new HttpException(500, 'An Unknown error occured'));
    }
  });
};

export default fileMiddleware;
