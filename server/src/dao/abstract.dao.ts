import { Database } from 'better-sqlite3';
import { DatabaseSingleton } from '../database/database.singleton';

export class AbstractDao {
  protected getDb(): Database {
    return DatabaseSingleton.get();
  }

  protected get<T = unknown>(sql: string, params: unknown[]): T | undefined {
    return this.getDb().prepare(sql).get(params);
  }

  protected all<T = unknown>(sql: string, params?: unknown[]): T[] | undefined {
    return this.getDb()
      .prepare(sql)
      .all(params || []);
  }

  protected run(sql: string, params: unknown[]): void {
    this.getDb().prepare(sql).run(params);
  }

  protected multiRun(sql: string, params: unknown[][]): void {
    const statement = this.getDb().prepare(sql);
    params.forEach((p) => {
      statement.run(...p);
    });
  }
}
