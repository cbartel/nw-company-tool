import { Component, Inject } from '@angular/core';
import { AdminService } from '../../../../services/admin/admin.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserWithPermissions } from '@nw-company-tool/model';

@Component({
  selector: 'app-character-delete',
  templateUrl: './character-delete.component.html',
  styleUrls: ['./character-delete.component.css']
})
export class CharacterDeleteComponent {
  constructor(
    private adminService: AdminService,
    @Inject(MAT_DIALOG_DATA) public user: UserWithPermissions,
    private dialogRef: MatDialogRef<CharacterDeleteComponent>
  ) {}

  abort() {
    this.dialogRef.close();
  }

  delete() {
    this.dialogRef.close('delete');
  }
}
