import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpeditionComponent } from './routes/root/expedition.component';

const routes: Routes = [
  {
    path: '',
    component: ExpeditionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpeditionRoutingModule {}
