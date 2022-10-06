import { Request } from 'express';

export interface User {
  id: number;
  email: string;
  password: string;
}

export interface RequestWithUser extends Request {
  user: User;
}
