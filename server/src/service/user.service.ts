import { UserDao } from '../dao/user/user.dao';
import { User } from '../model/user.model';
import {UserEntity} from "../dao/user/user.entity";

export class UserService {
  private static readonly INSTANCE = new UserService();

  public static get(): UserService {
    return UserService.INSTANCE;
  }

  private readonly userDao = UserDao.get();

  private constructor() {}

  public getAllUsers(): User[] {
    const entities = this.userDao.findAll();
    if (!entities) {
      return [];
    }
    return entities.map((entity) => ({
      id: entity.id!,
      discordId: entity.discord_id,
      discordUsername: entity.discord_username,
      characterName: entity.character_name,
      enabled: entity.enabled!,
      admin: entity.admin!
    }));
  }

  public getUserByDiscordId(discordId: string): User | undefined {
    const entity = this.userDao.findByDiscordId(discordId);
    if (!entity) {
      return undefined;
    }
    return {
      id: entity.id!,
      discordId: entity.discord_id,
      discordUsername: entity.discord_username,
      characterName: entity.character_name,
      enabled: entity.enabled!,
      admin: entity.admin!
    };
  }

  public getUserById(id: number): User | undefined {
    const entity = this.userDao.findById(id);
    if (!entity) {
      return undefined;
    }
    return {
      id: entity.id!,
      discordId: entity.discord_id,
      discordUsername: entity.discord_username,
      characterName: entity.character_name,
      enabled: entity.enabled!,
      admin: entity.admin!
    };
  }

  public createUser(user: User): User {
    const entity: UserEntity = {
      discord_id: user.discordId,
      discord_username: user.discordUsername,
      character_name: user.characterName,
      enabled: false,
      admin: false
    };
    if(this.userDao.userCount() === 0) {
      entity.admin = true;
      entity.enabled = true;
    }
    this.userDao.put(entity);

    return this.getUserByDiscordId(user.discordId)!;
  }

  public setCharacterName(id: number, name: string): void {
    this.userDao.setCharacterName(id, name);
  }

  public isEnabled(id: number): boolean {
    return this.userDao.isEnabled(id);
  }

  public isAdmin(id: number): boolean {
    return this.userDao.isAdmin(id);
  }

  public setEnabled(id: number, enabled: boolean): void {
    this.userDao.setEnabled(id, enabled);
  }

  public setAdmin(id: number, admin: boolean): void {
    this.userDao.setAdmin(id, admin);
  }
}
