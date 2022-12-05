import { Request } from 'express';
import { User } from './users.interface';

export interface CustomRequest extends Request {
  file: Express.Multer.File;
  thumbnail: Express.Multer.File;
  user: User;
}
