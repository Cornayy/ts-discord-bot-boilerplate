import { createLogger, transports as Transports, format } from 'winston';

const { printf, combine, timestamp, colorize } = format;
const colorizer = colorize();

export const Logger = createLogger({
    transports: new Transports.Console(),
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        printf(({ message, level, timestamp }) =>
            colorizer.colorize(level, `[${timestamp}]: ${message}`)
        )
    )
});
