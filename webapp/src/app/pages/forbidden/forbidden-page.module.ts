import { NgModule } from '@angular/core';
import { ForbiddenRoutingModule } from './forbidden-routing.module';
import { ForbiddenComponent } from './routes/root/forbidden.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [ForbiddenRoutingModule, MatCardModule, MatButtonModule],
  declarations: [ForbiddenComponent],
  providers: [],
  exports: []
})
export class ForbiddenPageModule {}
