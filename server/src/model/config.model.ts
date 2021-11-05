export type ServerConfig = {
  DISCORD: {
    CLIENT_ID: string;
    CLIENT_SECRET: string;
  };
  BASE_URL: string;
  TOKEN_SECRET: string;
  PORT?: number;
  DATABASE?: string;
  WEBAPP: ClientConfig;
};

export type ClientConfig = {
  COMPANY: {
    NAME: string;
    SERVER: string;
  };
};
