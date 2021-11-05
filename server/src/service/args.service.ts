export enum Args {
  DATAPATH,
  CONFIGNAME,
  DEVELOPMENT
}

export class ArgsService {
  private static readonly INSTANCE = new ArgsService();

  public static get(): ArgsService {
    return ArgsService.INSTANCE;
  }

  private readonly keyMap: Record<string, Args> = {
    '--dataPath': Args.DATAPATH,
    '--configName': Args.CONFIGNAME,
    '--dev': Args.DEVELOPMENT
  };

  private readonly arguments = new Map<Args, string>();

  private constructor() {
    let args = process.argv;
    while (args[0] && !args[0].startsWith('--')) {
      args = args.slice(1);
    }
    for (let i = 0; i + 1 < args.length; i += 2) {
      const key = args[i];
      const value = args[i + 1];
      if (this.keyMap.hasOwnProperty(key)) {
        const arg = this.keyMap[key];
        this.arguments.set(arg, value);
      } else {
        console.warn(`unknown command line parameter ${key}`);
      }
    }
    if (!this.getArgument(Args.DATAPATH)) {
      throw new Error('missing command line argument --dataPath');
    }
  }

  public getArgument(arg: Args): string | undefined {
    return this.arguments.get(arg);
  }
}
