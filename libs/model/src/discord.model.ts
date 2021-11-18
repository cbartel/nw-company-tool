export type TokenResponse = {
  access_token: string;
};

export type UserResponse = {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  flags: number;
  banner: string;
  banner_color: string;
  accent_color: string;
  locale: string;
  mfa_enabled: boolean;
  verified: string;
};
