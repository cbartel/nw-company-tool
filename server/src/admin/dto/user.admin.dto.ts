import { IsBoolean, IsNumber } from 'class-validator';
import { AdminUser } from '@nw-company-tool/model';

export class AdminUserDto implements AdminUser {
  @IsNumber()
  userId: number;
  @IsBoolean()
  admin: boolean;
}
