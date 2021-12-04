import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UserModule } from '../user/user.module';
import { GithubModule } from '../github/github.module';
import { ArgsModule } from '../args/args.module';
import { EventModule } from '../event/event.module';

@Module({
  imports: [UserModule, GithubModule, ArgsModule, EventModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
