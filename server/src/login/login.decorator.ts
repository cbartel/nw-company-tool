import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const IS_LOGGED_IN_KEY = 'isLoggedIn';
export const LoggedIn = () => SetMetadata(IS_LOGGED_IN_KEY, true);

export const ROLES_KEY = 'roles';
export const RequiredPermissions = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
