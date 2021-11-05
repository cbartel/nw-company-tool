import * as tar from 'tar-stream';
import * as zlib from 'zlib';
import * as fs from 'fs';
import * as fsExtra from 'fs-extra';

export class UpdateService {
  private static readonly INSTANCE = new UpdateService();

  public static get(): UpdateService {
    return UpdateService.INSTANCE;
  }

  private constructor() {}

  public update(): void {
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
          fsExtra.outputFile(filePath, data);
          console.log(`updating: ${header.name}`);
        }
        next();
      });
      stream.resume();
    });

    extract.on('finish', () => {
      console.log('done!!!');
    });

    // TODO filename, path and project build, backup before updating, ....
    fs.createReadStream(process.cwd() + '/nw-company-tool.tar.gz')
      .pipe(zlib.createGunzip())
      .pipe(extract);
  }
}
