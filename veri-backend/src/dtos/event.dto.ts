import { IsString } from 'class-validator';

export class ValidateEventDto {
  @IsString()
  public name: string;

  @IsString()
  public password: string;
}

export class addLiveRecipientDto {
  @IsString()
  public address: string;
}
