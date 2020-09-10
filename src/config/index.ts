import config from './config';

config();

export default {
  // Express
  expressPort: parseInt(process.env.EXPRESS_PORT ?? '4000', 10),
  // MySQL
  mysqlHost: process.env.MYSQL_HOST,
  mysqlPort: parseInt(process.env.MYSQL_PORT ?? '0', 10),
  mysqlUser: process.env.MYSQL_USER,
  mysqlPassword: process.env.MYSQL_PASSWORD,
  mysqlDatabase: process.env.MYSQL_DATABASE,
  mysqlMaxConnection: parseInt(process.env.MYSQL_MAX_CONN ?? '10', 10),
  mysqlMaxQueue: parseInt(process.env.MYSQL_MAX_QUEUE ?? '10', 10),
  // Google SpreadSheets
  seasonSheetId: process.env.SEASON_SHEET_ID,
  producerSheetId: process.env.PRODUCER_SHEET_ID,
  // Logs
  logDirectory: process.env.LOG_DIRECTORY,
};
