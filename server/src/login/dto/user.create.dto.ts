import { IsAlpha, IsNotEmpty } from 'class-validator';
import { CreateUser } from '@nw-company-tool/model';

export class CreateUserDto implements CreateUser {
  @IsAlpha()
  @IsNotEmpty()
  characterName: string;
}
