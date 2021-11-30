import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ArgsModule } from './args/args.module';
import { UserModule } from './user/user.module';
import { LoginModule } from './login/login.module';
import { DatabaseModule } from './database/database.module';
import { TokenModule } from './token/token.module';
import { AdminModule } from './admin/admin.module';
import { CharacterModule } from './character/character.module';
import { PluginModule } from './plugin/plugin.module';
import { FrontendMiddleware } from './middleware/frontend.middleware';
import { ExpeditionModule } from './expedition/expedition.module';

@Module({
  imports: [
    TokenModule,
    ConfigModule,
    ArgsModule,
    DatabaseModule,
    ExpeditionModule,
    UserModule,
    LoginModule,
    AdminModule,
    CharacterModule,
    PluginModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(FrontendMiddleware).forRoutes({ path: '/**', method: RequestMethod.ALL });
  }
}
