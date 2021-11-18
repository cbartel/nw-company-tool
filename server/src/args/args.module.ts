import { Module } from '@nestjs/common';
import { ArgsService } from './args.service';

@Module({
  imports: [],
  controllers: [],
  providers: [{ provide: ArgsService, useValue: ArgsService.get() }],
  exports: [ArgsService],
})
export class ArgsModule {}
