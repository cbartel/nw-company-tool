import { Args, ArgsService } from './args.service';
import * as fs from 'fs';
import { ClientConfig, ServerConfig } from '../model/config.model';

export class ConfigService {
  private static readonly INSTANCE = new ConfigService();

  public static get(): ConfigService {
    return ConfigService.INSTANCE;
  }

  private readonly argsService = ArgsService.get();

  private readonly serverConfig: ServerConfig;

  private constructor() {
    let configFileName = 'config.json';
    const configCommandLineArgument = this.argsService.getArgument(Args.CONFIG);
    if (configCommandLineArgument) {
      configFileName = configCommandLineArgument;
    }

    this.serverConfig = JSON.parse(fs.readFileSync(configFileName).toString());
  }

  public getServerConfig(): ServerConfig {
    return this.serverConfig;
  }

  public getClientConfig(): ClientConfig {
    return this.serverConfig.WEBAPP;
  }
}
