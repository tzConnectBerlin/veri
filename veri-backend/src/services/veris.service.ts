import { File } from '@interfaces/file.interface';
import { Files } from '@models/files.model';
import { HttpException } from '@exceptions/HttpException';
import { Veri } from '@interfaces/veris.interface';
import { Veris } from '@models/veris.model';
import { isEmpty } from '@utils/util';
import { User } from '@/interfaces/users.interface';
import { hash } from 'bcryptjs';
import { createImageAsset, createTokenDetails } from '@/utils/token';
import axios from 'axios';
import { CreateVeriDto } from '@/dtos/veris.dto';
import { CreateFileDto } from '@/dtos/files.dto';
import { PEPPERMINTERY_URL } from '@config';

class VeriService {
  private async getAllVeri(): Promise<Veri[]> {
    return Veris.query()
      .from('veris')
      .join('files', 'files.id', '=', 'veris.thumb_id')
      .select(
        'veris.id',
        'files.path as thumbnail',
        'veris.event_name as veri',
        'veris.organizer',
        'veris.event_start_date',
        'veris.event_end_date',
        'veris.status',
        'veris.live_distribution'
      );
  }

  private async updateVeriStatusById({
    id,
    status,
  }: {
    id: number;
    status: string;
  }) {
    await Veris.query()
      .update({
        status,
      })
      .where('id', '=', id)
      .into('veris');
  }

  private async getMintedStatus(veriId: number): Promise<boolean> {
    const minteryResult = await axios.get(
      `${PEPPERMINTERY_URL}/tokens/${veriId}`
    );
    return minteryResult.data.status.minted;
  }

  private async updateVeriStatusByMinted(veri: Veri) {
    const veriIsMinted = await this.getMintedStatus(veri.id);

    if (Boolean(veri.live_distribution) === true) {
      const startTime = new Date(veri.event_start_date).toDateString();
      const currentTime = new Date().toDateString();
      const endTime = new Date(veri.event_end_date).toDateString();

      if (veriIsMinted && startTime <= currentTime && endTime >= currentTime) {
        if (veri.status !== 'enabled') {
          await this.updateVeriStatusById({
            id: veri.id,
            status: 'enabled',
          });
        }
      } else {
        if (veri.status !== 'disabled') {
          await this.updateVeriStatusById({
            id: veri.id,
            status: 'disabled',
          });
        }
      }
    } else {
      if (veriIsMinted) {
        if (veri.status !== 'created') {
          await this.updateVeriStatusById({
            id: veri.id,
            status: 'created',
          });
        }
      } else {
        await this.updateVeriStatusById({
          id: veri.id,
          status: 'draft',
        });
      }
    }
  }

  public async findAllVeri(): Promise<Veri[]> {
    const veris: Veri[] = await this.getAllVeri();

    for await (const veri of veris) {
      if (veri.status !== 'draft') {
        try {
          await this.updateVeriStatusByMinted(veri);
        } catch (e) {
          // handle error
          // throw new HttpException(
          //   500,
          //   'Service unavilable, Please try again later.'
          // );
        }
      }
    }

    return this.getAllVeri();
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
      await this.updateVeriStatusByMinted(findVeri);
    } catch (e) {
      // handle error
      // throw new HttpException(
      //   500,
      //   'Service unavilable, Please try again later.'
      // );
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
        status: veriData.live_distribution === 'true' ? 'disabled' : 'draft',
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
        try {
          await Veris.query()
            .update({
              ...veriData,
              status: 'draft',
              file_id: createFileEntry.id,
              thumb_id: createThumbEntry.id,
              live_distribution_password: hashedPassword,
              updated_by: user.id,
            })
            .where('id', '=', createVeriData.id)
            .into('veris');
        } catch {
          throw new HttpException(
            500,
            `Service unavailable, please try again later.`
          );
        }
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

    const selectedVeri: Veri = await Veris.query()
      .select()
      .from('veris')
      .where('id', '=', veriId)
      .first();

    const selectedEvent: Veri = await Veris.query()
      .select()
      .from('veris')
      .where('event_name', '=', veriData.event_name)
      .first();
    if (selectedEvent) {
      if (Number(selectedEvent.id) !== veriId) {
        throw new HttpException(
          409,
          `Event ${veriData.event_name} already exists`
        );
      }
    }

    if (!selectedVeri) throw new HttpException(409, "Veri doesn't exist");

    if (file) {
      delete file.buffer;
      delete thumbnail.buffer;

      const fileUpdate = await Files.query()
        .update({ ...file })
        .where('id', '=', selectedVeri.file_id)
        .into('files');

      if (!fileUpdate) throw new HttpException(500, `Internal server error`);

      const thumbUpdate = await Files.query()
        .update({ ...thumbnail })
        .where('id', '=', selectedVeri.thumb_id)
        .into('files');

      if (!thumbUpdate) throw new HttpException(500, `Internal server error`);
    }

    const newPassword = await hash(veriData.live_distribution_password, 10);
    await Veris.query()
      .update({
        ...veriData,
        file_id: file && selectedVeri.file_id,
        thumb_id: file && selectedVeri.file_id,
        live_distribution_password: newPassword,
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
