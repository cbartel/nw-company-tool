import * as fs from 'fs-extra';
import { Args, ArgsService } from '../args/args.service';
import { ClientConfig, ServerConfig } from '@nw-company-tool/model';

const defaultConfig: ServerConfig = {
  DISCORD: {
    CLIENT_ID: 'ID',
    CLIENT_SECRET: 'SECRET',
  },
  BASE_URL: 'http://localhost:8080',
  TOKEN_SECRET: 'Test',
  PORT: 8080,
  DATABASE: 'database.db',
  WEBAPP: {
    COMPANY: {
      NAME: 'MY COMPANY',
      SERVER: 'MY SERVER',
    },
  },
};

export class ConfigService {
  private static readonly INSTANCE = new ConfigService();
  public static get(): ConfigService {
    return ConfigService.INSTANCE;
  }

  private readonly argsService = ArgsService.get();

  private readonly serverConfig: ServerConfig;

  constructor() {
    let configFileName = 'config.json';
    const configNameCommandLineArgument = this.argsService.getArgument(Args.CONFIGNAME);
    const dataPathCommandLineArgument = this.argsService.getArgument(Args.DATAPATH);
    if (configNameCommandLineArgument) {
      configFileName = configNameCommandLineArgument;
    }
    const configPath = dataPathCommandLineArgument + configFileName;
    if (!fs.pathExistsSync(configPath)) {
      fs.outputJSONSync(configPath, defaultConfig, { spaces: 2 });
    }

    this.serverConfig = JSON.parse(fs.readFileSync(dataPathCommandLineArgument + configFileName).toString());
  }

  public getServerConfig(): ServerConfig {
    return this.serverConfig;
  }

  public getClientConfig(): ClientConfig {
    return this.serverConfig.WEBAPP;
  }
}
