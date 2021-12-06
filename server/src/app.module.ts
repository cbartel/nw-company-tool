import { CacheModule, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
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
import { EventModule } from './event/event.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MaintenanceMiddleware } from './middleware/maintenance.middleware';

@Module({
  imports: [
    EventEmitterModule.forRoot({
      wildcard: true,
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 0,
    }),
    TokenModule,
    ConfigModule,
    ArgsModule,
    DatabaseModule,
    EventModule,
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
    consumer
      .apply(MaintenanceMiddleware)
      .forRoutes({ path: '/api/**', method: RequestMethod.ALL }, { path: '/plugin/**', method: RequestMethod.ALL });
  }
}
