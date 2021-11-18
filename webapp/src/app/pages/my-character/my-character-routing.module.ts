import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCharacterComponent } from './routes/root/my-character.component';
import { LoginGuard } from '../../guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: MyCharacterComponent,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyCharacterRoutingModule {}
