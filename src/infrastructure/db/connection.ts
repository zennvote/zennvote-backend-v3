import * as mysql from 'mysql2/promise';
import configs from '@src/config';

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
      queueLimit: configs.mysqlMaxQueue,
    });
  }

  const connection = await connectionPool.getConnection();

  return connection;
};
