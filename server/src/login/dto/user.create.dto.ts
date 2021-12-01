import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { CreateUser } from '@nw-company-tool/model';

export class CreateUserDto implements CreateUser {
  @Matches(/^[a-zA-Z0-9\s]+$/)
  @MinLength(2)
  @MaxLength(24)
  @IsString()
  characterName: string;
}
