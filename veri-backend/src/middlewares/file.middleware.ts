import multer from 'multer';
import { RequestWithFile } from '@/interfaces/veris.interface';
import { Response, NextFunction } from 'express';
import { HttpException } from '@/exceptions/HttpException';
import path from 'path';

const fileMiddleware = async (
  req: RequestWithFile,
  res: Response,
  next: NextFunction
) => {
  const upload = multer({
    dest: 'uploads/',
    limits: {
      fields: 13,
      fieldNameSize: 50,
      fieldSize: 20000,
      fileSize: 64000,
    },
    fileFilter: (_req, file, cb) => {
      isValid(file, cb);
    },
  }).single('artwork_file');
  upload(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      next(new HttpException(500, 'File upload error'));
    } else if (error) {
      next(new HttpException(400, 'Please check file type and try again'));
    }
    next();
  });
};

const isValid = (file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb({
      name: 'File not supported',
      message: 'Only image files are supported',
    });
  }
};

export default fileMiddleware;
