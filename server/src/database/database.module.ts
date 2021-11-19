import { Module } from '@nestjs/common';
import { DatabaseClient } from './database.client';
import { ArgsModule } from '../args/args.module';

@Module({
  imports: [ArgsModule],
  providers: [DatabaseClient],
  exports: [DatabaseClient],
})
export class DatabaseModule {}
