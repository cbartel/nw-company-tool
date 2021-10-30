export enum Args {
  CONFIG
}

export class ArgsService {
  private static readonly INSTANCE = new ArgsService();

  public static get(): ArgsService {
    return ArgsService.INSTANCE;
  }

  private readonly keyMap: Record<string, Args> = {
    '-c': Args.CONFIG
  };

  private readonly arguments = new Map<Args, string>();

  private constructor() {
    const args = process.argv.slice(2);
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
  }

  public getArgument(arg: Args): string | undefined {
    return this.arguments.get(arg);
  }
}
