import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { SetCharacterName } from '@nw-company-tool/model';

export class SetCharacterNameDto implements SetCharacterName {
  @Matches(/^[a-zA-Z0-9\s]+$/)
  @MinLength(2)
  @MaxLength(24)
  @IsString()
  characterName: string;
}
