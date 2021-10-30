import { AbstractDao } from '../abstract.dao';
import { UserEntity } from './user.entity';

export class UserDao extends AbstractDao {
  private static readonly INSTANCE = new UserDao();

  public static get(): UserDao {
    return UserDao.INSTANCE;
  }

  public userCount(): number {
    const sql = `
      SELECT count(*) as count FROM user;
    `
    return this.get<{ count: number }>(sql, [])!.count;
  }

  public findAll(): UserEntity[] | undefined {
    const sql = `
      SELECT * FROM user;
    `;

    return this.all(sql);
  }

  public findAllEnabled(): UserEntity[] | undefined {
    const sql = `
      SELECT * FROM user WHERE enabled = 1;
    `;

    return this.all(sql);
  }

  public findByDiscordId(discordId: string): UserEntity | undefined {
    const sql = `
      SELECT * FROM user WHERE discord_id = ?
    `;

    return this.get<UserEntity>(sql, [discordId]);
  }

  public findById(id: number): UserEntity | undefined {
    const sql = `
      SELECT * FROM user WHERE id = ?
    `;

    return this.get<UserEntity>(sql, [id]);
  }

  public isEnabled(id: number): boolean {
    const sql = `
      SELECT enabled from user WHERE id = ?
    `;
    return this.get<{ enabled: number }>(sql, [id])?.enabled === 1;
  }

  public isAdmin(id: number): boolean {
    const sql = `
      SELECT admin from user WHERE id = ?
    `;
    return this.get<{ admin: number }>(sql, [id])?.admin === 1;
  }

  public put(user: UserEntity): void {
    const sql = `
      INSERT INTO
        user (discord_id, discord_username, character_name, enabled, admin)
      VALUES
        (?, ?, ?, ?, ?)
    `;

    this.run(sql, [user.discord_id, user.discord_username, user.character_name, +user.enabled!, +user.admin!]);
  }

  public setEnabled(id: number, enabled: boolean): void {
    const sql = `
      UPDATE user SET enabled = ? WHERE id = ?;
    `;
    this.run(sql, [+enabled, id]);
  }

  public setAdmin(id: number, admin: boolean): void {
    const sql = `
      UPDATE user SET admin = ? WHERE id = ?;
    `;
    this.run(sql, [+admin, id]);
  }

  public setCharacterName(id: number, name: string): void {
    const sql = `
      UPDATE user SET character_name = ? WHERE id = ?;
    `
    this.run(sql, [name, id]);
  }
}
