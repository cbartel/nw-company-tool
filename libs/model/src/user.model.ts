export type User = {
  id: number;
  discordId: string;
  discordUsername: string;
  characterName: string;
};

export type UserAvatar = {
  url: string;
};

export type Permissions = {
  permissions: Permission[];
};

export enum Permission {
  ENABLED = 'ENABLED',
  ADMIN = 'ADMIN',
}

export type UserWithPermissions = User & Permissions;

export class SetCharacterName {
  characterName: string;
}
