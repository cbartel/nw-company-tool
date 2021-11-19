import { Controller, Get } from '@nestjs/common';
import { PluginManifest } from '@nw-company-tool/model';
import { PluginService } from './plugin.service';
import { Public } from '../login/login.decorator';

@Controller('/api/plugin')
@Public()
export class PluginController {
  constructor(private pluginService: PluginService) {}

  @Get('/manifests')
  getPluginManifests(): PluginManifest[] {
    return this.pluginService.getPluginManifests();
  }
}
