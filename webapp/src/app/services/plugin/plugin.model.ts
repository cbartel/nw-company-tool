import { LoadRemoteModuleOptions } from '@angular-architects/module-federation';

export type PluginDefinition = LoadRemoteModuleOptions & {
  navigationName: string;
  navigationIcon: string;
  navigationLabel: string;
  componentName: string;
};
