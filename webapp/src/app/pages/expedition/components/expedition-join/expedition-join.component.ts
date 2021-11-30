import { Component, Inject } from '@angular/core';
import { ExpeditionService } from '../../../../services/expedition/expedition.service';
import { Expedition } from '@nw-company-tool/model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Slot } from '../expedition-table/expedition-table.component';
import * as moment from 'moment';

export type ExpeditionJoinDialogData = {
  slot: Slot;
  expedition: Expedition;
};

@Component({
  selector: 'app-expedition-join',
  templateUrl: './expedition-join.component.html',
  styleUrls: ['./expedition-join.component.css']
})
export class ExpeditionJoinComponent {
  hasKeyForm = new FormControl(false);

  constructor(
    private expeditionService: ExpeditionService,
    public dialogRef: MatDialogRef<ExpeditionJoinComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: ExpeditionJoinDialogData
  ) {}

  joinExpedition(): void {
    this.expeditionService.joinExpedition({
      id: this.dialogData.expedition.id,
      hasTuningOrb: this.hasKeyForm.value,
      role: this.dialogData.slot.role
    });
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }

  formatDate(date: string): string {
    return moment
      .utc(date)
      .local()
      .format(`${moment.localeData().longDateFormat('LL')} ${moment.localeData().longDateFormat('LT')}`);
  }

  openInDiscord(discordId: string): void {
    window.open(`discord://discordapp.com/users/${discordId}`);
  }

  openOwnerInDiscord() {
    this.openInDiscord(this.dialogData.expedition.owner.discordId);
  }
}
