import { Router } from 'express';
import VerisController from '../controllers/veris.controller';
import { CreateVeriDto } from '../dtos/veris.dto';
import { Routes } from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import fileMiddleware from '../middlewares/file.middleware';
import authMiddleware from '@/middlewares/auth.middleware';

class VerisRoute implements Routes {
  public path = '/veris';
  public router = Router();
  public verisController = new VerisController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      authMiddleware,
      this.verisController.getVeris
    );
    this.router.get(`${this.path}/:id(\\d+)`, this.verisController.getVeriById);
    this.router.post(
      `${this.path}`,
      authMiddleware,
      fileMiddleware,
      validationMiddleware(CreateVeriDto, 'body'),
      this.verisController.createVeri
    );
    this.router.put(
      `${this.path}/:id(\\d+)`,
      authMiddleware,
      fileMiddleware,
      validationMiddleware(CreateVeriDto, 'body', true),
      this.verisController.updateVeri
    );
    this.router.delete(
      `${this.path}/:id(\\d+)`,
      this.verisController.deleteVeri
    );
  }
}

export default VerisRoute;