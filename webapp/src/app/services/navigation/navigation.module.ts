import { NgModule } from '@angular/core';
import { UserModule } from '../user/user.module';
import { NavigationService } from './navigation.service';
import { PluginModule } from '../plugin/plugin.module';

@NgModule({
  providers: [NavigationService],
  imports: []
})
export class NavigationModule {}
