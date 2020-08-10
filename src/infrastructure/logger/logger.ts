import * as winston from 'winston';
import * as fs from 'fs';
import 'winston-daily-rotate-file';

const logDir = 'log';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ level, message, timestamp }) => JSON.stringify({
      level, timestamp, message: message.replace(/\u001b\[\d+m/g, '') + ' testmessage'
    })),
  ),
  transports: [
    new winston.transports.Console({ format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.colorize(),
      winston.format.printf(({ level, message, timestamp }) => `${timestamp} ▶ ${level}\t ${message}`)
    ) }),
    new winston.transports.DailyRotateFile({ filename: 'error.%DATE%.log', datePattern: 'YYYY-MM-DD', maxSize: '20m', zippedArchive: true, level: 'error' }),
    new winston.transports.DailyRotateFile({ filename: 'combined.%DATE%.log', datePattern: 'YYYY-MM-DD', maxSize: '20m', zippedArchive: true, level: 'http' }),
  ],
});

export default logger;