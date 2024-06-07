import { createLogger, format, Logger, transports } from 'winston';
import { logConfig } from '~/config';

const initLogger = (): Logger =>
  createLogger({
    level: logConfig.level,
    format:
      logConfig.format === 'json'
        ? format.json()
        : format.combine(format.cli(), format.simple()),
    transports: [new transports.Console()],
    silent: !logConfig.isEnabled
  });

export { initLogger };
