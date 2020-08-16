import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';
import { isArray } from 'util';
import { UnexpectedQueryResultError } from './errors';

type QueryResult = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader;

export const parseSelectResult = (query: string, result: QueryResult) => {
  if (!isArray(result)) {
    throw new UnexpectedQueryResultError(query, result);
  }
  if (result.length === 0) return [];

  const flatten = result.flat();
  if (flatten[0].constructor.name === 'OkPacket') {
    throw new UnexpectedQueryResultError(query, result);
  }

  return flatten.map((value) => value as RowDataPacket);
};
