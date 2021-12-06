import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import process from 'process';
import { ConfigService } from './config/config.service';
import { Logger, LogLevel, NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { Args, ArgsService, Flags } from './args/args.service';

import cookieParser from 'cookie-parser';
import { exec } from 'child_process';
import Path from 'path';

process.chdir(__dirname + '/../');

const logger = new Logger('NWCT Server');
const argsService = ArgsService.get();
const configService = ConfigService.get();

function run(command: string): Promise<void> {
  return new Promise<void>((resolve) => {
    const proc = exec(command);

    proc.stdout.on('data', (data) => {
      logger.log(data);
    });
    proc.stderr.on('data', (data) => {
      logger.error(data);
    });
    proc.on('close', () => {
      resolve();
    });
  });
}

async function setupDatabase() {
  process.env.DATABASE_URL = `file:${Path.join(
    argsService.getArgument(Args.DATAPATH),
    configService.getServerConfig().DATABASE,
  )}`;

  await run('npx prisma migrate deploy');
  await run('npx prisma generate');
}

async function bootstrap() {
  await setupDatabase();
  const options: NestApplicationOptions = {};
  const loggerOptions: LogLevel[] = ['error', 'warn', 'log'];
  const debugLoggerOptions: LogLevel[] = ['error', 'warn', 'log', 'debug'];
  if (!argsService.getFlag(Flags.DEVELOPMENT)) {
    options.logger = loggerOptions;
  } else {
    options.logger = debugLoggerOptions;
  }
  const app = await NestFactory.create(AppModule, options);
  const port = configService.getServerConfig().PORT || 8080;
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  logger.log(`server listening on port ${port}`);
}
bootstrap();
