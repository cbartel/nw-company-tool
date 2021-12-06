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
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { ExpeditionJoinComponent } from './components/expedition-join/expedition-join.component';
import { CharacterDetailModule } from '../../components/character-detail/character-detail.module';

@NgModule({
  imports: [
    ExpeditionRoutingModule,
    MatDialogModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatTooltipModule,
    TranslateModule,
    CharacterDetailModule
  ],
  declarations: [ExpeditionComponent, ExpeditionTableComponent, ExpeditionCreateComponent, ExpeditionJoinComponent],
  providers: [],
  exports: []
})
export class ExpeditionPageModule {}
