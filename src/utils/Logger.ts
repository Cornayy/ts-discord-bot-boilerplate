export class Logger {
    public static info(msg: string): void {
        console.log(`\x1b[37;42minfo\x1b[32;49m ${msg}\x1b[0m`);
    }

    public static warn(msg: string): void {
        console.log(`\x1b[37;43mwarn\x1b[33;49m ${msg}\x1b[0m`);
    }

    public static error(msg: NodeJS.ErrnoException): void {
        console.error(`\x1b[37;41merror\x1b[31;49m ${msg.stack}\x1b[0m`);
    }
}
