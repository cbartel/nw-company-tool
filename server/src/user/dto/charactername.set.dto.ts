import { IsAlpha, IsNotEmpty } from 'class-validator';
import { SetCharacterName } from '@nw-company-tool/model';

export class SetCharacterNameDto implements SetCharacterName {
  @IsAlpha()
  @IsNotEmpty()
  characterName: string;
}
