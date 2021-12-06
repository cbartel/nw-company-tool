import { exec, fork } from 'child_process';
import process from 'process';
import { ArgsService, Flags } from './args/args.service';

const argsService = ArgsService.get();

async function startServer() {
  console.log(`
-----------------------------------------------------------------------------------------------------------------------------

███    ██ ██     ██      ██████  ██████  ███    ███ ██████   █████  ███    ██ ██    ██     ████████  ██████   ██████  ██      
████   ██ ██     ██     ██      ██    ██ ████  ████ ██   ██ ██   ██ ████   ██  ██  ██         ██    ██    ██ ██    ██ ██      
██ ██  ██ ██  █  ██     ██      ██    ██ ██ ████ ██ ██████  ███████ ██ ██  ██   ████          ██    ██    ██ ██    ██ ██      
██  ██ ██ ██ ███ ██     ██      ██    ██ ██  ██  ██ ██      ██   ██ ██  ██ ██    ██           ██    ██    ██ ██    ██ ██      
██   ████  ███ ███       ██████  ██████  ██      ██ ██      ██   ██ ██   ████    ██           ██     ██████   ██████  ███████ 
               
-----------------------------------------------------------------------------------------------------------------------------                                                                                        
  `);

  process.chdir(__dirname + /../);
  await installDependencies();
  const server = fork(__dirname + '/server', process.argv, Object.create(process.env));

  server.on('message', (msg) => {
    if (msg == 'restart') {
      console.log('restarting server...');
      server.kill('SIGINT');
      setTimeout(() => startServer(), 1000);
    }
  });
}

function run(command: string): Promise<void> {
  return new Promise<void>((resolve) => {
    const proc = exec(command);

    proc.stdout.on('data', (data) => {
      console.log(data);
    });
    proc.stderr.on('data', (data) => {
      console.error(data);
    });
    proc.on('close', () => {
      resolve();
    });
  });
}

async function installDependencies() {
  if (argsService.getFlag(Flags.DEVELOPMENT)) {
    console.log('skipping dependencies as this server in running in development mode.');
    return;
  }
  console.log('installing dependencies... (this may take a while)');
  await run('npm install --only=production');
  await run('npm prune');
  await run('npx prisma generate');
  console.log('installing dependencies... done.');
}

startServer();
