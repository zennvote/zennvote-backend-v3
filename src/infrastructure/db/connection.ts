import * as mysql from 'mysql2/promise';
import configs from '@src/config';
import logger from '@src/infrastructure/logger/logger';

let connectionPool: mysql.Pool | undefined;

export const getConnection = async () => {
  if (!connectionPool) {
    connectionPool = mysql.createPool({
      host: configs.mysqlHost,
      port: configs.mysqlPort,
      user: configs.mysqlUser,
      password: configs.mysqlPassword,
      database: configs.mysqlDatabase,
      connectionLimit: configs.mysqlMaxConnection,
      waitForConnections: false,
    });
  }

  try {
    const connection = await connectionPool.getConnection();

    logger.info('DB Connection Created. ');

    return connection;
  } catch (err) {
    logger.error('DB Connection Creation Failed. See error log.');

    throw err;
  }
};
