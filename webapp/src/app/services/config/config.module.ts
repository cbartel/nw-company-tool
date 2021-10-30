import { NgModule } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  providers: [ConfigService],
  imports: [HttpClientModule]
})
export class ConfigModule {}
