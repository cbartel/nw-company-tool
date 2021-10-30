export const dbV1 = `

  CREATE TABLE IF NOT EXISTS user
  (
    id               integer primary key,
    discord_id       text unique not null,
    discord_username text        not null,
    character_name   text        not null,
    enabled          boolean default false,
    admin            boolean default false
  );

  CREATE UNIQUE INDEX IF NOT EXISTS idx_discord_id ON user (discord_id);

  CREATE TABLE IF NOT EXISTS character_attribute
  (
    user_id integer not null,
    key     text    not null,
    value   text    not null,
    UNIQUE (user_id, key)
  );

  CREATE UNIQUE INDEX IF NOT EXISTS idx_user_id_key ON character_attribute (user_id, key);

  REPLACE INTO version(version) VALUES (1)
`;
