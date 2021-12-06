import { DeleteUser } from '@nw-company-tool/model';
import { IsNumber } from 'class-validator';

export class DeleteUserDto implements DeleteUser {
  @IsNumber()
  userId: number;
}
