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
    const veris: Veri[] = await Veris.query()
      .from('veris')
      .join('files', 'files.id', '=', 'veris.thumb_id')
      .select(
        'veris.id',
        'files.path as thumbnail',
        'veris.event_name as veri',
        'veris.organizer',
        'veris.event_start_date',
        'veris.event_end_date',
        'veris.status'
      );

    for await (const veri of veris) {
      try {
        const getCurrentStatus = await axios.get(
          `${PEPPERMINTERY_URL}/tokens/${veri.id}`
        );
        veri.status = getCurrentStatus.data.status;
      } catch {
        throw new HttpException(
          500,
          'Service unavilable, Please try again later.'
        );
      }
    }

    return veris;
  }

  public async findVeriById(veriId: number): Promise<Veri> {
    const findVeri: Veri = await Veris.query()
      .findById(veriId)
      .join('files', 'files.id', '=', 'veris.file_id')
      .select(
        'veris.id',
        'veris.event_name as veri',
        'veris.organizer',
        'veris.organizer_email',
        'veris.event_type',
        'veris.event_start_date',
        'veris.event_end_date',
        'files.path as artwork',
        'veris.artwork_description',
        'veris.live_distribution',
        'veris.live_distribution_url',
        'veris.live_distribution_password',
        'veris.status'
      );

    if (!findVeri) throw new HttpException(409, "Veri doesn't exist");

    try {
      const getCurrentStatus = await axios.get(
        `${PEPPERMINTERY_URL}/tokens/${veriId}`
      );
      findVeri.status = getCurrentStatus.data.status;
    } catch {
      throw new HttpException(
        500,
        'Service unavilable, Please try again later.'
      );
    }

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

    if (!createThumbEntry) {
      await Files.query()
        .delete()
        .where('id', '=', createFileEntry.id)
        .into('files');

      throw new HttpException(500, `Internal server error`);
    }

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

    if (!createVeriData) {
      await Files.query()
        .delete()
        .where('id', '=', createFileEntry.id)
        .into('files');

      await Files.query()
        .delete()
        .where('id', '=', createThumbEntry.id)
        .into('files');

      throw new HttpException(500, `Internal server error`);
    }

    if (veriData.status === 'created') {
      try {
        await axios.put(
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
      } catch {
        veriData.status = 'draft';
        await Veris.query()
          .update({
            ...veriData,
            file_id: createFileEntry.id,
            thumb_id: createThumbEntry.id,
            updated_by: user.id,
          })
          .where('id', '=', createVeriData.id)
          .into('veris');

        throw new HttpException(
          500,
          `Service unavailable, please try again later.`
        );
      }
    }

    return await this.findVeriById(createVeriData.id);
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

    const findEvent: Veri = await Veris.query()
      .select()
      .from('veris')
      .where('event_name', '=', veriData.event_name)
      .first();
    if (findEvent)
      throw new HttpException(
        409,
        `Event ${veriData.event_name} already exists`
      );

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

    return await this.findVeriById(updateVeriData.id);
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
