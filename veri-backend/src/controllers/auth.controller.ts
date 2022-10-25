import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '../dtos/users.dto';
import { RequestWithUser } from '../interfaces/auth.interface';
import { User } from '../interfaces/users.interface';
import AuthService from '../services/auth.service';

class AuthController {
  public authService = new AuthService();

  public signUp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);

      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const { cookie, findUser } = await this.authService.login(userData);
      delete findUser.password;
      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };

  public currentUser = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (req.user) {
        const userData: User = req.user;
        delete userData.password;
        res.status(200).json({ data: userData, message: 'current user' });
      } else {
        res.status(204).json({ data: {}, message: 'not found' });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
