import { Component, OnInit } from '@angular/core';
import { PluginService } from './services/plugin/plugin.service';
import { Router, Routes } from '@angular/router';
import { PluginDefinition } from './services/plugin/plugin.model';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { routes } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private pluginService: PluginService) {}

  async ngOnInit(): Promise<void> {
    const plugins = await this.pluginService.getPlugins().toPromise();
    const routes = this.buildRoutes(plugins);
    this.router.resetConfig(routes);
  }

  buildRoutes(plugins: PluginDefinition[]): Routes {
    const lazyRoutes: Routes = plugins.map((plugin) => ({
      path: plugin.navigationName,
      loadChildren: () => loadRemoteModule(plugin).then((m) => m[plugin.componentName])
    }));
    return [...routes, ...lazyRoutes];
  }
}
