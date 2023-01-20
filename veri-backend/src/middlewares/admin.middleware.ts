import { RequestHandler, Response } from 'express';
import { CustomRequest } from '@interfaces/request.interface';
import { ADMIN_USER } from '@/constants/admin';
import { Users } from '@models/users.model';
import { HttpException } from '@exceptions/HttpException';

const adminMiddleware = (): RequestHandler => {
  return (req: CustomRequest, res: Response, next) => {
    const email = ADMIN_USER.email;
    Users.query()
      .select()
      .from('users')
      .where('email', '=', ADMIN_USER.email)
      .first()
      .then((user) => {
        const userId = user?.id;
        if (userId === undefined) {
          next(
            new HttpException(
              500,
              `Internal server error: Could not find admin user`
            )
          );
        }

        req.user = {
          id: Number(userId),
          email,
          password: ADMIN_USER.password,
        };
        next();
      })
      .catch(() => {
        next(
          new HttpException(
            500,
            `Internal server error: Could not find admin user`
          )
        );
      });
  };
};

export default adminMiddleware;
