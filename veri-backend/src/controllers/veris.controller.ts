import { CreateFileDto } from '@/dtos/files.dto';
import { CreateUserDto } from '@/dtos/users.dto';
import { File } from '@/interfaces/file.interface';
import { RequestWithUser, User } from '@/interfaces/users.interface';
import { NextFunction, Request, Response } from 'express';
import { CreateVeriDto } from '../dtos/veris.dto';
import { Veri } from '../interfaces/veris.interface';
import veriService from '../services/veris.service';

class VeriController {
  public veriService = new veriService();

  public getVeris = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const findAllVerisData: Veri[] = await this.veriService.findAllVeri();

      res.status(200).json({ data: findAllVerisData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getVeriById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const veriId = Number(req.params.id);
      const findOneVeriData: Veri = await this.veriService.findVeriById(veriId);

      res.status(200).json({ data: findOneVeriData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createVeri = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const veriData: CreateVeriDto = req.body;
      const artwork: CreateFileDto = req.files[0];
      const thumbnail: CreateFileDto = req.files[1];
      const user: User = req.user;
      const createVeriData: Veri = await this.veriService.createVeri(
        veriData,
        artwork,
        thumbnail,
        user
      );

      res.status(201).json({ data: createVeriData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateVeri = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const veriId = Number(req.params.id);
      const veriData: Veri = req.body;
      const file: File = req.file;
      const user: User = req.user;
      const updateVeriData: Veri = await this.veriService.updateVeri(
        veriId,
        veriData,
        file,
        user
      );

      res.status(200).json({ data: updateVeriData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteVeri = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const veriId = Number(req.params.id);
      const deleteVeriData: Veri = await this.veriService.deleteVeri(veriId);

      res.status(200).json({ data: deleteVeriData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default VeriController;
