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
  live_distribution_password: string;
  file_id: number;
  thumb_id: number;
  created_by: number;
  updated_by: number;
  status!: string;
  recipients: string[];

  static tableName = 'veris'; // database table name
  static idColumn = 'id'; // id column name
}

export type VerisShape = ModelObject<Veris>;
