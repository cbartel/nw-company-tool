import { exec, fork } from 'child_process';
import process from 'process';
import { promisify } from 'util';
import { Args, ArgsService } from './service/args.service';

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

async function installDependencies() {
  if (argsService.getArgument(Args.DEVELOPMENT) === 'true') {
    console.log('skipping dependencies as this server in running in development mode.');
    return;
  }
  console.log('installing dependencies... (this may take a while)');
  await promisify(exec)('npm install --only=production');
  console.log('installing dependencies... done.');
}

startServer().then(() => console.log('server started.'));
