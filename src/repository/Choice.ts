import Choice from '@src/domain/Choice';
import { getConnection } from '@src/infrastructure/db/connection';
import { isArray } from 'util';
import { UnexpectedQueryResultError } from '@src/infrastructure/db/errors';
import { RowDataPacket } from 'mysql2';

export const getChoices = async (): Promise<Choice[]> => {
  const connection = await getConnection();

  const queryString = 'SELECT * FROM choice';
  const [queryResult] = await connection.query(queryString);
  connection.release();
  if (!isArray(queryResult)) {
    throw new UnexpectedQueryResultError(queryString, queryResult);
  }

  const result = queryResult.flat()
    .map((value) => value as RowDataPacket)
    .map(({ name, index, value }) => ({ name, index, value }))
    .reduce((original, row) => {
      const choices = original;
      if (!choices[row.name]) {
        choices[row.name] = { name: row.name, choices: [] };
      }
      choices[row.name].choices[row.index] = row.value;

      return choices;
    }, {} as ({ [key: string]: Choice }));

  return Object.values(result);
};

export const getChoiceByName = async (name: string): Promise<Choice | null> => {
  const connection = await getConnection();

  const queryString = `SELECT * FROM choice WHERE name="${name}"`;
  const [queryResult] = await connection.query(queryString);
  connection.release();
  if (!isArray(queryResult)) {
    throw new UnexpectedQueryResultError(queryString, queryResult);
  }

  if (queryResult.length === 0) {
    return null;
  }

  const result = queryResult.flat()
    .map((value) => value as RowDataPacket)
    .map(({ index, value }) => ({ index, value }))
    .reduce<Choice>((original, row) => {
      const choice = original;
      choice.choices[row.index] = row.value;

      return choice;
    }, { name, choices: [] });

  return result;
};
