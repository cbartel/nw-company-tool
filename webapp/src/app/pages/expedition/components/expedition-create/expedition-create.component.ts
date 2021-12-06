import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Moment } from 'moment';
import { ExpeditionService } from '../../../../services/expedition/expedition.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ExpeditionName, Role } from '@nw-company-tool/model';

type CreateExpeditionForm = {
  date: Moment;
  time: string;
  expedition: ExpeditionName;
  hasKey: boolean;
  role: Role;
};

@Component({
  selector: 'app-expedition-create',
  templateUrl: './expedition-create.component.html',
  styleUrls: ['./expedition-create.component.css']
})
export class ExpeditionCreateComponent {
  role = Role;
  form = new FormGroup({
    date: new FormControl(moment(), [Validators.required]),
    time: new FormControl(moment().format('HH:mm'), [Validators.required]),
    expedition: new FormControl(null, [Validators.required]),
    hasKey: new FormControl(false),
    role: new FormControl(null, [Validators.required])
  });

  constructor(
    public dialogRef: MatDialogRef<ExpeditionCreateComponent>,
    private expeditionService: ExpeditionService
  ) {}

  create() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const formData: CreateExpeditionForm = this.form.value;
      const beginDateTime = formData.date
        .set({
          hour: +formData.time.split(':')[0],
          minute: +formData.time.split(':')[1]
        })
        .toISOString();
      this.expeditionService
        .createExpedition({
          name: formData.expedition,
          beginDateTime,
          hasTuningOrb: formData.hasKey,
          role: formData.role
        })
        .subscribe(() => {
          this.dialogRef.close();
        });
    }
  }

  getExpeditions(): ExpeditionName[] {
    return Object.values(ExpeditionName);
  }
}
