import { Model, ModelObject } from 'objection';
import { Recipient } from '../interfaces/recipients.interface';

export class Recipients extends Model implements Recipient {
  id!: number;
  task_id: number;
  token_id: number;
  address: string;
  amount: number;
  state: string;

  static tableName = 'recipients'; // database table name
  static idColumn = 'id'; // id column name
}

export type RecipientsShape = ModelObject<Recipients>;
