export enum Args {
  DATAPATH,
  CONFIGNAME
}

export enum Flags {
  DEVELOPMENT
}

export class ArgsService {
  private static readonly INSTANCE = new ArgsService();

  public static get(): ArgsService {
    return ArgsService.INSTANCE;
  }

  private readonly keyMap: Record<string, Args> = {
    '--dataPath': Args.DATAPATH,
    '--configName': Args.CONFIGNAME
  };

  private readonly flagMap: Record<string, Flags> = {
    '--development': Flags.DEVELOPMENT
  };

  private readonly arguments = new Map<Args, string>();
  private readonly flags = new Map<Flags, boolean>();

  private constructor() {
    let args = process.argv;
    while (args[0] && !args[0].startsWith('--')) {
      args = args.slice(1);
    }
    for (let i = 0; i + 1 < args.length; i += 1) {
      const key = args[i];
      if (this.keyMap.hasOwnProperty(key)) {
        const arg = this.keyMap[key];
        i += 1;
        const value = args[i];
        this.arguments.set(arg, value);
      } else if (this.flagMap.hasOwnProperty(key)) {
        const flag = this.flagMap[key];
        this.flags.set(flag, true);
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

  public getFlag(flag: Flags): boolean {
    return this.flags.get(flag) === true;
  }
}
