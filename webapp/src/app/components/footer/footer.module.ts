import { NgModule } from '@angular/core';
import { FooterComponent } from './footer.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [MatButtonModule],
  declarations: [FooterComponent],
  exports: [FooterComponent]
})
export class FooterModule {}
