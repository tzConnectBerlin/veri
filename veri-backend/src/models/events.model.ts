import { Model, ModelObject } from 'objection';
import { Event } from '../interfaces/events.interface';

export class Events extends Model implements Event {
  id!: number;
  name!: string;
  description!: string;

  static tableName = 'events'; // database table name
  static idColumn = 'id'; // id column name
}

export type EventsShape = ModelObject<Events>;
