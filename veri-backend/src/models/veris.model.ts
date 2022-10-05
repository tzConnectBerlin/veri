import { Model, ModelObject } from 'objection';
import { Veri } from '../interfaces/veris.interface';

export class Veris extends Model implements Veri {
  id!: number;
  event_name!: string;
  event_description: string;
  event_contact_email!: string;
  event_type!: string;
  event_start_date!: string;
  event_end_date!: string;
  artwork_name!: string;
  artwork_description: string;
  live_distribution!: string;
  live_distribution_url: string;
  file_id: number;

  static tableName = 'veris'; // database table name
  static idColumn = 'id'; // id column name
}

export type VerisShape = ModelObject<Veris>;
