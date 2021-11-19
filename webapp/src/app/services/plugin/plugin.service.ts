import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PluginDefinition } from './plugin.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PluginManifest } from '@nw-company-tool/model';

@Injectable({
  providedIn: 'root'
})
export class PluginService {
  private plugins = new Map<string, PluginDefinition>();

  constructor(private http: HttpClient) {}

  getPlugin(navigationName: string): PluginDefinition {
    return this.plugins.get(navigationName);
  }

  getPlugins(): Observable<PluginDefinition[]> {
    return this.http.get<PluginManifest[]>('/api/plugin/manifests').pipe(
      map((pluginManifests) => {
        const pluginDefinitions = pluginManifests.map((manifest) => ({
          remoteEntry: manifest.remoteEntry,
          remoteName: manifest.remoteName,
          exposedModule: manifest.exposedModule,
          navigationName: manifest.navigationName,
          navigationIcon: manifest.navigationIcon,
          navigationLabel: manifest.navigationLabel,
          componentName: manifest.componentName
        }));
        pluginDefinitions.forEach((plugin) => {
          this.plugins.set(plugin.navigationName, plugin);
        });
        return pluginDefinitions;
      })
    );
  }
}
