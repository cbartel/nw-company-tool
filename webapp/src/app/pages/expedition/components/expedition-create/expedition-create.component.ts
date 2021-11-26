import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Moment } from 'moment';
import { ExpeditionService } from '../../../../services/expedition/expedition.service';
import { MatDialogRef } from '@angular/material/dialog';

type CreateExpeditionForm = {
  date: Moment;
  time: string;
  expedition: string;
  hasKey: boolean;
};

@Component({
  selector: 'app-expedition-create',
  templateUrl: './expedition-create.component.html',
  styleUrls: ['./expedition-create.component.css']
})
export class ExpeditionCreateComponent {
  form = new FormGroup({
    date: new FormControl(moment(), [Validators.required]),
    time: new FormControl(moment().format('HH:mm'), [Validators.required]),
    expedition: new FormControl(null, [Validators.required]),
    hasKey: new FormControl(false)
  });

  constructor(
    public dialogRef: MatDialogRef<ExpeditionCreateComponent>,
    private expeditionService: ExpeditionService
  ) {}

  create() {
    this.form.markAllAsTouched();
    const expedition: CreateExpeditionForm = this.form.value;

    if (this.form.valid) {
      this.expeditionService.createExpedition({
        name: expedition.expedition,
        beginDateTime: expedition.date
          .set({
            hour: +expedition.time.split(':')[0],
            minute: +expedition.time.split(':')[1]
          })
          .format('YYYY-MM-DDTHH:mm'),
        participants: [
          {
            userId: 1,
            characterName: 'Krise',
            discordId: '1',
            hasKey: true,
            role: 'damage'
          }
        ],
        owner: {
          userId: 1,
          characterName: 'Krise',
          discordId: '1'
        }
      });
      this.dialogRef.close();
    }
  }
}
