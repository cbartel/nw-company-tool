import { Attribute, AttributeQuery } from '@nw-company-tool/model';
import { IsArray, IsNotEmpty } from 'class-validator';

export class AttributeQueryDto implements AttributeQuery {
  @IsArray()
  @IsNotEmpty()
  attributes: Attribute[];
}
