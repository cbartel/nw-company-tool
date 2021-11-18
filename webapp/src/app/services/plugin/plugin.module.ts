import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { PluginService } from './plugin.service';

@NgModule({
  providers: [PluginService],
  imports: [HttpClientModule]
})
export class PluginModule {}
