import { IsString } from 'class-validator';

export class CreateFileDto {
  @IsString()
  public fieldname: string;

  @IsString()
  public originalname: string;

  @IsString()
  public encoding: string;

  @IsString()
  public mimetype: string;

  @IsString()
  public destination: string;

  @IsString()
  public filename: string;

  @IsString()
  public path: string;

  @IsString()
  public size: number;

  @IsString()
  public buffer?: Buffer;
}
