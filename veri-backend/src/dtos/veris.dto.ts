import {
  IsString,
  IsEmail,
  IsDateString,
  IsUrl,
  IsBooleanString,
  IsOptional,
} from 'class-validator';

export class CreateVeriDto {
  @IsString()
  public event_name: string;

  @IsString()
  public event_description: string;

  @IsEmail()
  public event_contact_email: string;

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
  @IsUrl()
  public live_distribution_url?: string;

  @IsOptional()
  @IsString()
  public live_distribution_password?: string;

  @IsString()
  public status: string;
}
