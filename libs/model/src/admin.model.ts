export type Version = {
  version: string;
};

export interface AdminUser {
  userId: number;
  admin: boolean;
}

export interface EnableUser {
  userId: number;
  enabled: boolean;
}

export interface DeleteUser {
  userId: number;
}
