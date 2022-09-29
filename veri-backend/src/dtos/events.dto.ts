import { IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  public name: string;

  @IsString()
  public description: string;
}
