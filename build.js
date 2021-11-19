const { dependencies } = require('./server/package.json');
const exec = require('child_process').exec;
const fs = require('fs-extra');

const assets = [
  'LICENSE',
  'README.md',
  'server/schema.prisma',
  'server/migrations',
];

const packageJson = {
  name: 'nw-company-tool',
  version: '0.0.0',
  description: 'A tool to organize your new world company',
  author: 'Krise',
  license: 'MIT',
  keywords: ['New World', 'Company', 'Tool', 'Gaming'],
  bugs: {
    url: 'https://github.com/cbartel/nw-company-tool/issues',
  },
  homepage: 'https://github.com/cbartel/nw-company-tool',
  repository: {
    type: 'git',
    url: 'https://github.com/cbartel/nw-company-tool.git',
  },
  dependencies,
};

function run(command) {
  return new Promise((resolve) => {
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

async function build() {
  fs.removeSync('./dist');
  fs.removeSync('./webapp/dist');
  fs.removeSync('./server/dist');

  await run('npm --prefix webapp install');
  await run('npm --prefix webapp run ng build ');
  await run('npm --prefix server install ');
  await run('npm --prefix server run build ');

  fs.copySync('./server/dist', './dist/dist');
  fs.copySync('./webapp/dist/app', './dist/dist/app');
  fs.outputJsonSync('./dist/package.json', packageJson, { spaces: 2 });
  assets.forEach((asset) => {
    const source = asset;
    const path = asset.split('/');
    const dest = path[path.length - 1];
    fs.copySync(`./${source}`, `./dist/${dest}`);
  });
}

build().then(() => console.log('build complete.'));
