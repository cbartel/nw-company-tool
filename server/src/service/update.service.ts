import * as tar from 'tar-stream';
import * as zlib from 'zlib';
import * as fs from 'fs-extra';
import { Readable } from 'stream';
import * as process from 'process';

export class UpdateService {
  private static readonly INSTANCE = new UpdateService();

  public static get(): UpdateService {
    return UpdateService.INSTANCE;
  }

  private constructor() {}

  public readCurrentPackageVersion(): string {
    const packageJson = fs.readJsonSync(`${process.cwd()}/package.json`);
    return packageJson.version;
  }

  public update(updateData: Readable): Promise<void> {
    return new Promise((resolve) => {
      const extract = tar.extract();
      extract.on('entry', (header, stream, next) => {
        let data = '';

        stream.on('data', (chunk) => {
          if (header.type === 'file') {
            data += chunk;
          }
        });

        stream.on('end', () => {
          if (header.type === 'file') {
            const filePath = `${process.cwd()}/${header.name}`;
            fs.outputFileSync(filePath, data);
            console.log(`updated: ${header.name}`);
          }
          next();
        });
        stream.resume();
      });

      extract.on('finish', () => {
        console.log('updating files complete.');
        resolve();
      });

      updateData.pipe(zlib.createGunzip()).pipe(extract);
    });
  }
}
