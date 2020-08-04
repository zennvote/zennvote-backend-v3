import * as mysql from 'mysql2/promise';
import '@src/types/global';

let connectionPool: mysql.Pool | undefined;

const getConnection = connectionPool;