import { Model, ModelObject } from 'objection';
import { File } from '../interfaces/file.interface';

export class Files extends Model implements File {
  id!: number;
  fieldname!: string;
  originalname!: string;
  encoding!: string;
  mimetype!: string;
  destination!: string;
  filename!: string;
  path!: string;
  size!: number;

  static tableName = 'files'; // database table name
  static idColumn = 'id'; // id column name
}

export type FilesShape = ModelObject<Files>;
