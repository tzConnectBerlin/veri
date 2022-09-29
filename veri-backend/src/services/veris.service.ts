import { CreateVeriDto } from '../dtos/veris.dto';
import { HttpException } from '../exceptions/HttpException';
import { Veri } from '../interfaces/veris.interface';
import { Veris } from '../models/veris.model';
import { isEmpty } from '../utils/util';

class VeriService {
  public async findAllVeri(): Promise<Veri[]> {
    const veris: Veri[] = await Veris.query().select().from('veris');
    return veris;
  }

  public async findVeriById(veriId: number): Promise<Veri> {
    const findVeri: Veri = await Veris.query().findById(veriId);
    if (!findVeri) throw new HttpException(409, "Veri doesn't exist");

    return findVeri;
  }

  public async createVeri(veriData: CreateVeriDto): Promise<Veri> {
    if (isEmpty(veriData)) throw new HttpException(400, 'veriData is empty');

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

    const createVeriData: Veri = await Veris.query()
      .insert({ ...veriData })
      .into('veris');

    return createVeriData;
  }

  public async updateVeri(veriId: number, veriData: Veri): Promise<Veri> {
    if (isEmpty(veriData)) throw new HttpException(400, 'veriData is empty');

    const findVeri: Veri[] = await Veris.query()
      .select()
      .from('veris')
      .where('id', '=', veriId);
    if (!findVeri) throw new HttpException(409, "Veri doesn't exist");

    await Veris.query()
      .update({ ...veriData })
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
    return findVeri;
  }
}

export default VeriService;
