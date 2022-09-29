import { Model, ModelObject } from 'objection';
import { Veri } from '../interfaces/veris.interface';

export class Veris extends Model implements Veri {
  id!: number;
  event_name!: string;
  event_description: string;
  event_contact_email!: string;
  event_type!: boolean;
  event_start_date!: string;
  event_end_date!: string;
  artwork_name!: string;
  artwork_description: string;
  live_distribution!: boolean;
  live_distribution_url: string;

  static tableName = 'veris'; // database table name
  static idColumn = 'id'; // id column name
}

export type UsersShape = ModelObject<Veris>;
