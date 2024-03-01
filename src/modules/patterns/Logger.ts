export class Logger {
  private static instance: Logger | null = null;
  private logs: string[] = [];

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  log(message: string): void {
    console.log(`[LOG]: ${message}`);
    this.logs.push(message);
  }

  getLogList(): string[] {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }
}
