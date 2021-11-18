import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import path from 'path';
import { Args, ArgsService } from '../args/args.service';

const dataPath = ArgsService.get().getArgument(Args.DATAPATH);

@Module({
  imports: [
    ServeStaticModule.forRoot(
      {
        rootPath: path.join(dataPath, 'plugins'),
        serveRoot: '/plugins',
      },
      {
        rootPath: path.join(process.cwd(), 'dist', 'app'),
        serveRoot: '/',
      },
    ),
  ],
  controllers: [],
  providers: [],
})
export class StaticModule {}
