import { Injectable } from '@nestjs/common';
import { Args, ArgsService } from '../args/args.service';
import Path from 'path';
import * as fs from 'fs-extra';
import { PluginManifest } from '@nw-company-tool/model';

@Injectable()
export class PluginService {
  private readonly pluginRoot: string;

  constructor(argsService: ArgsService) {
    const dataPath = argsService.getArgument(Args.DATAPATH) as string;
    this.pluginRoot = Path.join(dataPath, 'plugins/');
    if (!fs.pathExistsSync(this.pluginRoot)) {
      fs.mkdirSync(this.pluginRoot);
    }
  }

  public getPluginManifests(): PluginManifest[] {
    const pluginDirectories = fs
      .readdirSync(this.pluginRoot)
      .filter((file) => fs.lstatSync(Path.join(this.pluginRoot, file)).isDirectory());
    const pluginManifests: PluginManifest[] = [];
    pluginDirectories.forEach((dir) => {
      const manifestPath = Path.join(this.pluginRoot, dir, 'manifest.json');
      if (fs.existsSync(manifestPath)) {
        const manifest: PluginManifest = fs.readJsonSync(manifestPath);
        manifest.remoteEntry = Path.join('plugins', dir, 'remoteEntry.js');
        pluginManifests.push(manifest);
      }
    });
    return pluginManifests;
  }
}
