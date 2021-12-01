import { Injectable } from '@nestjs/common';
import { Permission, User, UserAvatar, UserWithPermissions } from '@nw-company-tool/model';
import { DatabaseClient } from '../database/database.client';

@Injectable()
export class UserService {
  constructor(private client: DatabaseClient) {}

  async findAll(): Promise<User[]> {
    return this.client.user.findMany();
  }

  async findAllWithPermissions(): Promise<UserWithPermissions[]> {
    return this.client.user
      .findMany({
        include: {
          UserPermission: true,
        },
      })
      .then((result) =>
        result.map((user) => ({
          id: user.id,
          discordId: user.discordId,
          discordUsername: user.discordUsername,
          characterName: user.characterName,
          permissions: user.UserPermission.map((it) => it.permission as Permission),
        })),
      );
  }

  async findById(id: number): Promise<User> {
    return this.client.user.findUnique({ where: { id } });
  }

  async findPermissionsById(userId: number): Promise<string[]> {
    return this.client.userPermission
      .findMany({ where: { userId } })
      .then((permissions) => permissions.map((permission) => permission.permission));
  }

  async findUserWithPermissionsById(id: number): Promise<UserWithPermissions | undefined> {
    const user = await this.client.user.findUnique({
      where: { id },
      include: {
        UserPermission: true,
      },
    });
    if (!user) {
      return undefined;
    }
    return {
      id: user.id,
      discordId: user.discordId,
      discordUsername: user.discordUsername,
      characterName: user.characterName,
      permissions: user.UserPermission.map((it) => it.permission as Permission),
    };
  }

  async findByDiscordId(discordId: string): Promise<User> {
    return this.client.user.findUnique({ where: { discordId } });
  }

  async create(user: Omit<User, 'id'>): Promise<User> {
    if ((await this.client.user.count()) === 0) {
      return this.client.user.create({
        data: {
          discordId: user.discordId,
          discordUsername: user.discordUsername,
          characterName: user.characterName,
          UserPermission: {
            create: [{ permission: Permission.ENABLED }, { permission: Permission.ADMIN }],
          },
        },
      });
    } else {
      return this.client.user.create({ data: user });
    }
  }

  async delete(id: number): Promise<void> {
    await this.client.user.delete({
      where: {
        id,
      },
    });
  }

  async setCharacterName(id: number, characterName: string): Promise<User> {
    return this.client.user.update({ where: { id }, data: { characterName } });
  }

  async setPermission(userId: number, permission: Permission): Promise<void> {
    await this.client.userPermission.upsert({
      where: { userId_permission: { userId, permission } },
      create: { userId, permission },
      update: { permission },
    });
  }

  async removePermission(userId: number, permission: Permission): Promise<void> {
    await this.client.userPermission.delete({ where: { userId_permission: { userId, permission } } });
  }

  getAvatar(user: User, discordAvatar: string, size?: number): UserAvatar {
    const url = `https://cdn.discordapp.com/avatars/${user.discordId}/${discordAvatar}.png`;
    if (size) {
      return { url: `${url}?size=${size}` };
    }
    return { url };
  }
}
