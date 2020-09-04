import * as winston from 'winston';
import * as fs from 'fs';
import { join } from 'path';
import 'winston-daily-rotate-file';
import config from '@src/config';

const logDir = config.logDirectory ?? 'logs';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ level, message, timestamp }) => JSON.stringify({
      // eslint-disable-next-line no-control-regex
      level, timestamp, message: `${message.replace(/\u001b\[\d+m/g, '')} testmessage`,
    })),
  ),
  transports: [
    new winston.transports.Console({ format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.colorize(),
      winston.format.printf(({ level, message, timestamp }) => `${timestamp} ▶ ${level}\t ${message}`),
    ) }),
    new winston.transports.DailyRotateFile({
      filename: join(logDir, 'error.%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      zippedArchive: true,
      level: 'error',
    }),
    new winston.transports.DailyRotateFile({
      filename: join(logDir, 'combined.%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      zippedArchive: true,
      level: 'http',
    }),
  ],
});

export default logger;
