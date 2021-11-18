import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { StaticModule } from './static/static.module';
import { ArgsModule } from './args/args.module';
import { UserModule } from './user/user.module';
import { LoginModule } from './login/login.module';
import { DatabaseModule } from './database/database.module';
import { TokenModule } from './token/token.module';
import { AdminModule } from './admin/admin.module';
import { CharacterModule } from './character/character.module';
import { PluginModule } from './plugin/plugin.module';

@Module({
  imports: [
    TokenModule,
    ConfigModule,
    ArgsModule,
    DatabaseModule,
    StaticModule,
    UserModule,
    LoginModule,
    AdminModule,
    CharacterModule,
    PluginModule,
  ],
})
export class AppModule {}
