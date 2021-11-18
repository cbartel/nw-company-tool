import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './routes/root/admin.component';
import { UsersTableComponent } from './components/admin-users-table/users-table.component';
import { AdminModule } from '../../services/admin/admin.module';
import { UserModule } from '../../services/user/user.module';
import { SnackbarModule } from '../../services/snackbar/snackbar.module';
import { UpdateComponent } from './components/update/update.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    AdminRoutingModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    CommonModule
  ],
  declarations: [AdminComponent, UsersTableComponent, UpdateComponent],
  providers: [],
  exports: []
})
export class AdminPageModule {}
