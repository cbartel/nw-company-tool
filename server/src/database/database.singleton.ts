import sqlite3, { Database } from 'better-sqlite3';
import { dbVersion } from './schema/database.version';
import { dbV1 } from './schema/database.v1';
import { ConfigService } from '../service/config.service';
import { Args, ArgsService, Flags } from '../service/args.service';

export class DatabaseSingleton {
  private static readonly CURRENT_DB_VERSION = 1;

  private static readonly INSTANCE = new DatabaseSingleton();
  private readonly db: Database;

  private constructor() {
    const config = ConfigService.get().getServerConfig();
    const dataPath = ArgsService.get().getArgument(Args.DATAPATH);
    const databaseFileName = config.DATABASE || 'database.db';
    const databaseFullPath = dataPath + databaseFileName;
    this.db = new sqlite3(
      databaseFullPath,
      ArgsService.get().getFlag(Flags.DEVELOPMENT) ? { verbose: console.log } : {}
    );
    this.db.exec(dbVersion);
    this.setupDbSchema();
  }

  public getDb(): Database {
    return this.db;
  }

  public static get(): Database {
    return DatabaseSingleton.INSTANCE.db;
  }

  private setupDbSchema() {
    const versionWrapper: { version: number } = this.db.prepare('SELECT version from version').get([]);
    if (!versionWrapper) {
      console.log(`db schema not initialized yet. Creating schema version ${DatabaseSingleton.CURRENT_DB_VERSION}`);
      this.initDb(DatabaseSingleton.CURRENT_DB_VERSION);
      return;
    }
    const version = versionWrapper.version;
  }

  private initDb(version: number) {
    switch (version) {
      case 1: {
        this.db.exec(dbV1);
        console.log(`db schema initiated in version 1`);
        break;
      }
    }
  }
}
