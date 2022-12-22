import {
  IsString,
  IsEmail,
  IsDateString,
  IsUrl,
  IsBooleanString,
  IsOptional,
  IsEnum,
} from 'class-validator';

export enum Status {
  draft = 'draft',
  created = 'created',
}

export class CreateVeriDto {
  @IsString()
  public event_name: string;

  @IsOptional()
  @IsString()
  public organizer?: string;

  @IsEmail()
  public organizer_email: string;

  @IsString()
  public event_type: string;

  @IsDateString()
  public event_start_date: string;

  @IsDateString()
  public event_end_date: string;

  @IsString()
  public artwork_name: string;

  @IsString()
  public artwork_description: string;

  @IsBooleanString()
  public live_distribution: string;

  @IsOptional()
  @IsString()
  public live_distribution_url?: string;

  @IsOptional()
  @IsString()
  public live_distribution_password?: string;

  @IsString()
  @IsEnum(Status)
  public status: string;
}
