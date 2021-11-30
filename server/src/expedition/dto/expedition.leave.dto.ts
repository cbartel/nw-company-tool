import { LeaveExpedition } from '@nw-company-tool/model';
import { IsNumber } from 'class-validator';

export class LeaveExpeditionDto implements LeaveExpedition {
  @IsNumber()
  id: number;
}
