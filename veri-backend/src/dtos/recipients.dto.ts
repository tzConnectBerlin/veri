import { IsArray } from 'class-validator';

export class CreateRecipientsDto {
  @IsArray()
  public addresses: string[];
}
