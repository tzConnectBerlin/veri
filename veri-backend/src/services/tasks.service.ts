import { File } from '../interfaces/file.interface';
import { Files } from '../models/files.model';
import { CreateVeriDto } from '../dtos/veris.dto';
import { HttpException } from '../exceptions/HttpException';
import { Task } from '../interfaces/tasks.interface';
import { Tasks } from '../models/veris.model';
import { isEmpty } from '../utils/util';
import { CreateFileDto } from '@/dtos/files.dto';
import { User } from '@/interfaces/users.interface';
import { hash } from 'bcryptjs';

class pepperminteryService {
  public async create(taskData: Task): Promise<Task> {
    const findTask: Task = await Tasks.query()
      .select()
      .from('tasks')
      .where('event_name', '=', taskData.event_name)
      .first();
    if (findVeri)
      throw new HttpException(
        409,
        `Veri for this event ${veriData.event_name} already exists`
      );
    const result: Veri[] = [];
    for (const veri of veris) {
      const findFile: File = await Files.query().findById(veri.file_id);
      veri.file = findFile;
      result.push(veri);
    }
    return veri;
  }

  public async mint(veriId: number): Promise<Task> {
    const findVeri: Veri = await Veris.query().findById(veriId);
    if (!findVeri) throw new HttpException(409, "Veri doesn't exist");

    const findFile: File = await Files.query().findById(findVeri.file_id);
    if (!findFile) throw new HttpException(409, "Veri doesn't exist");
    findVeri.file = findFile;

    return findVeri;
  }

  public async recent(
    veriData: CreateVeriDto,
    file: CreateFileDto,
    user: User
  ): Promise<Veri> {
    return createVeriData;
  }

  public async status(
    veriId: number,
    veriData: Veri,
    file: File,
    user: User
  ): Promise<Veri> {
    if (isEmpty(veriData)) throw new HttpException(400, 'veriData is empty');

    const findVeri: Veri = await Veris.query()
      .select()
      .from('veris')
      .where('id', '=', veriId)
      .first();

    if (!findVeri) throw new HttpException(409, "Veri doesn't exist");

    await Files.query()
      .update({ ...file })
      .where('id', '=', findVeri.file_id)
      .into('files');

    await Veris.query()
      .update({
        ...veriData,
        file_id: findVeri.file_id,
        thumb_id: findVeri.file_id,
        updated_by: user.id,
      })
      .where('id', '=', veriId)
      .into('veris');

    const updateVeriData: Veri = await Veris.query()
      .select()
      .from('veris')
      .where('id', '=', veriId)
      .first();
    return updateVeriData;
  }

  public async health(veriId: number): Promise<Veri> {
    const findVeri: Veri = await Veris.query()
      .select()
      .from('veris')
      .where('id', '=', veriId)
      .first();
    if (!findVeri) throw new HttpException(409, "Veri doesn't exist");

    await Veris.query().delete().where('id', '=', veriId).into('veris');

    await Files.query()
      .delete()
      .where('id', '=', findVeri.file_id)
      .into('files');
    return findVeri;
  }
}

export default pepperminteryService;
