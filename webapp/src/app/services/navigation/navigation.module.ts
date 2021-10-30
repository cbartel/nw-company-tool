import { NgModule } from '@angular/core';
import { UserModule } from '../user/user.module';
import { NavigationService } from './navigation.service';

@NgModule({
  providers: [NavigationService],
  imports: [UserModule]
})
export class NavigationModule {}
