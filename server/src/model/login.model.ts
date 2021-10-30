import { User } from './user.model';

export type LoginResponse = {
  success: boolean;
  newUser?: boolean;
  user?: User;
};

export type RegisterRequest = {
  characterName: string;
};
