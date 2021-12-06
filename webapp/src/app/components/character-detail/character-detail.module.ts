import { NgModule } from '@angular/core';
import { CharacterDetailComponent } from './character-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [MatDialogModule, CommonModule, MatProgressBarModule, TranslateModule, MatButtonModule],
  declarations: [CharacterDetailComponent],
  exports: [CharacterDetailComponent]
})
export class CharacterDetailModule {}
