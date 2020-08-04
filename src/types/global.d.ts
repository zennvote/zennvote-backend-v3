import * as mysql from 'mysql2/promise';

declare type Optional<T> = T | null;
declare const connectionPool: mysql.Pool | undefined;

declare global {
  interface Global {
    connectionPool: mysql.Pool | undefined;
  }
}