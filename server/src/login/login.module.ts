import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { UserModule } from '../user/user.module';
import { DiscordModule } from '../discord/discord.module';
import { TokenModule } from '../token/token.module';
import { APP_GUARD } from '@nestjs/core';
import { LoginGuard } from './login.guard';

@Module({
  imports: [UserModule, DiscordModule, TokenModule],
  controllers: [LoginController],
  providers: [{ provide: APP_GUARD, useClass: LoginGuard }],
  exports: [],
})
export class LoginModule {}
