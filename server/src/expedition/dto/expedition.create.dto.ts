import { CreateExpedition, ExpeditionName, Role } from '@nw-company-tool/model';
import { IsBoolean, IsDateString, IsEnum } from 'class-validator';

export class CreateExpeditionDto implements CreateExpedition {
  @IsDateString()
  beginDateTime: string;

  @IsBoolean()
  hasTuningOrb: boolean;

  @IsEnum(ExpeditionName)
  name: ExpeditionName;

  @IsEnum(Role)
  role: Role;
}
