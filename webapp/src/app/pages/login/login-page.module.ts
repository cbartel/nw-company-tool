import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './routes/root/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [LoginRoutingModule, MatCardModule, MatButtonModule],
  declarations: [LoginComponent],
  providers: [],
  exports: []
})
export class LoginPageModule {}
