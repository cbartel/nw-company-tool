import { UserWithPermissions } from './user.model';

export class LoginResponse {
  success: boolean;
  newUser?: boolean;
  user?: UserWithPermissions;
}

export class LoginUrl {
  loginUrl: string;
}

export interface CreateUser {
  characterName: string;
}
