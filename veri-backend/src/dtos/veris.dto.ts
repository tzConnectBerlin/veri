import { IsFQDN, IsString, IsBoolean, IsInt } from 'class-validator';

export class CreateVeriDto {
  @IsInt()
  public event: string;

  @IsBoolean()
  public live_distribution: boolean;

  @IsFQDN()
  public live_distribution_url: string;

  @IsString()
  public note: string;
}
