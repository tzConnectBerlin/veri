import { Model, ModelObject } from 'objection';
import { Task } from '../interfaces/tasks.interface';

export class Tasks extends Model implements Task {
  id!: number;
  event_name!: string;
  status!: string;
  request_id: number;
  asset_id: number;
  filename: string;
  recipient_ids: number[];

  static tableName = 'tasks'; // database table name
  static idColumn = 'id'; // id column name
}

export type tasksShape = ModelObject<Tasks>;
