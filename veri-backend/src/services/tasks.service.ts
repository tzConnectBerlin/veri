import { File } from '../interfaces/file.interface';
import { Files } from '../models/files.model';
import { CreateVeriDto } from '../dtos/veris.dto';
import { HttpException } from '../exceptions/HttpException';
import { Task } from '../interfaces/tasks.interface';
import { Tasks } from '../models/tasks.model';
import { isEmpty } from '../utils/util';
import { CreateFileDto } from '@/dtos/files.dto';
import { User } from '@/interfaces/users.interface';
import fetch from 'node-fetch';
import { Response } from 'node-fetch';

class pepperminteryService {
  public async create(taskData: Task): Promise<Response> {
    const result = await fetch('http://peppermint', {
      method: 'POST',
      body: JSON.stringify(taskData),
      headers: { 'Content-Type': 'application/json' },
    });
    return result;
  }

  public async mint(taskData: Task): Promise<Response> {
    const result = await fetch('http://peppermint', {
      method: 'POST',
      body: JSON.stringify(taskData),
      headers: { 'Content-Type': 'application/json' },
    });
    return result;
  }
}

export default pepperminteryService;
