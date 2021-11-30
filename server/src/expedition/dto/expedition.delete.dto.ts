import { DeleteExpedition } from '@nw-company-tool/model';
import { IsNumber } from 'class-validator';

export class DeleteExpeditionDto implements DeleteExpedition {
  @IsNumber()
  id: number;
}
