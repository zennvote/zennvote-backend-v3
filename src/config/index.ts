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
};
