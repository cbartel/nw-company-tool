import { NgModule } from '@angular/core';
import { ExpeditionRoutingModule } from './expedition-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ExpeditionComponent } from './routes/root/expedition.component';
import { ExpeditionTableComponent } from './components/expedition-table/expedition-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { ExpeditionCreateComponent } from './components/expedition-create/expedition-create.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ExpeditionRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    ReactiveFormsModule
  ],
  declarations: [ExpeditionComponent, ExpeditionTableComponent, ExpeditionCreateComponent],
  providers: [],
  exports: []
})
export class ExpeditionPageModule {}
