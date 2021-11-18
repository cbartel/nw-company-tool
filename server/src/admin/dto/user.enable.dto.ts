import { IsBoolean, IsNumber } from 'class-validator';
import { EnableUser } from '@nw-company-tool/model';

export class EnableUserDto implements EnableUser {
  @IsNumber()
  userId: number;
  @IsBoolean()
  enabled: boolean;
}
