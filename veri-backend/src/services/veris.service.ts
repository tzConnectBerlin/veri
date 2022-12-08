import { File } from '../interfaces/file.interface';
import { Files } from '../models/files.model';
import { HttpException } from '../exceptions/HttpException';
import { Veri } from '../interfaces/veris.interface';
import { Veris } from '../models/veris.model';
import { isEmpty } from '../utils/util';
import { User } from '@/interfaces/users.interface';
import { hash } from 'bcryptjs';
import { createImageAsset, createTokenDetails } from '@/utils/token';
import axios from 'axios';
import { CreateVeriDto } from '@/dtos/veris.dto';
import { CreateFileDto } from '@/dtos/files.dto';
import { PEPPERMINTERY_URL } from '../config';

class VeriService {
  public async findAllVeri(): Promise<Veri[]> {
    const veris: Veri[] = await Veris.query().select().from('veris');
    const result: Veri[] = [];
    for (const veri of veris) {
      const findFile: File = await Files.query().findById(veri.file_id);
      veri.file = findFile;
      result.push(veri);
    }
    return veris;
  }

  public async findVeriById(veriId: number): Promise<Veri> {
    const findVeri: Veri = await Veris.query().findById(veriId);
    if (!findVeri) throw new HttpException(409, "Veri doesn't exist");

    const findFile: File = await Files.query().findById(findVeri.file_id);
    if (!findFile) throw new HttpException(409, "Veri doesn't exist");
    findVeri.file = findFile;

    return findVeri;
  }

  public async createVeri(
    veriData: CreateVeriDto,
    file: CreateFileDto,
    thumbnail: CreateFileDto,
    user: User
  ): Promise<Veri> {
    if (isEmpty(veriData))
      throw new HttpException(400, 'Please enter Veri details.');

    const hashedPassword = await hash(veriData.live_distribution_password, 10);
    const buffer = file.buffer;

    delete file.buffer;
    delete thumbnail.buffer;

    const findVeri: Veri = await Veris.query()
      .select()
      .from('veris')
      .where('event_name', '=', veriData.event_name)
      .first();
    if (findVeri)
      throw new HttpException(
        409,
        `Veri for this event ${veriData.event_name} already exists`
      );

    const createFileEntry: File = await Files.query()
      .insert({ ...file })
      .into('files');

    if (!createFileEntry) throw new HttpException(500, `Internal server error`);

    const createThumbEntry: File = await Files.query()
      .insert({ ...thumbnail })
      .into('files');

    if (!createThumbEntry)
      throw new HttpException(500, `Internal server error`);

    const createVeriData: Veri = await Veris.query()
      .insert({
        ...veriData,
        file_id: createFileEntry.id,
        thumb_id: createThumbEntry.id,
        live_distribution_password: hashedPassword,
        created_by: user.id,
        updated_by: user.id,
      })
      .into('veris');

    if (!createVeriData) throw new HttpException(500, `Internal server error`);

    const createTask = await axios.put(
      `${PEPPERMINTERY_URL}/tokens/${createVeriData.id}`,
      {
        token_details: createTokenDetails(veriData),
        image_asset: createImageAsset(file, buffer),
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!createTask) throw new HttpException(500, `Internal server error`);

    return createVeriData;
  }

  public async updateVeri(
    veriId: number,
    veriData: Veri,
    file: File,
    thumbnail: File,
    user: User
  ): Promise<Veri> {
    if (isEmpty(veriData)) throw new HttpException(400, 'veriData is empty');

    const findVeri: Veri = await Veris.query()
      .select()
      .from('veris')
      .where('id', '=', veriId)
      .first();

    if (!findVeri) throw new HttpException(409, "Veri doesn't exist");

    delete file.buffer;
    delete thumbnail.buffer;

    const fileUpdate = await Files.query()
      .update({ ...file })
      .where('id', '=', findVeri.file_id)
      .into('files');

    if (!fileUpdate) throw new HttpException(500, `Internal server error`);

    const thumbUpdate = await Files.query()
      .update({ ...thumbnail })
      .where('id', '=', findVeri.thumb_id)
      .into('files');

    if (!thumbUpdate) throw new HttpException(500, `Internal server error`);

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

  public async deleteVeri(veriId: number): Promise<Veri> {
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

export default VeriService;
