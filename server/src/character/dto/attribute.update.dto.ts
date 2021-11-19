import { Attribute, AttributeUpdate } from '@nw-company-tool/model';
import { IsAlphanumeric, IsEnum, IsString } from 'class-validator';

export class AttributeUpdateDto implements AttributeUpdate {
  @IsEnum(Attribute)
  attribute: Attribute;

  @IsString()
  @IsAlphanumeric()
  value: string;
}
