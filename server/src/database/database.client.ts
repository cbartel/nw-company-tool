import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ArgsService, Flags } from '../args/args.service';

@Injectable()
export class DatabaseClient extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(private argsService: ArgsService) {
    super({
      log: argsService.getFlag(Flags.DEVELOPMENT) ? ['query', 'info'] : ['info'],
    });
  }

  async onModuleDestroy(): Promise<void> {
    await this.$connect();
  }

  async onModuleInit(): Promise<void> {
    await this.$disconnect();
  }
}
