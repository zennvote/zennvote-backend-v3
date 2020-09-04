import Quiz from '@src/domain/Quiz';
import { getConnection } from '@src/infrastructure/db/connection';
import { RowDataPacket } from 'mysql2/promise';

export const getQuizzes = async (): Promise<Quiz[]> => {
  const connection = await getConnection();

  const quizQueryString = `
  SELECT 
    quiz.\`index\`,
    quiz_item.\`index\` as itemIndex,
    quiz.title,
    quiz_item.content
  FROM quiz
  JOIN quiz_item ON quiz.id = quiz_item.quiz_id;
  `;
  const [queryResult] = await connection.query<RowDataPacket[]>(quizQueryString);

  connection.release();

  const result = queryResult
    .reduce((original, { index, itemIndex, title, content }) => {
      const quizzes = [...original];

      if (!original[index]) {
        quizzes[index] = { index, title, contents: [] };
      }

      quizzes[index].contents[itemIndex] = content;

      return quizzes;
    }, [] as Quiz[]);

  return result;
};

export const getQuizByIndex = async (index: number): Promise<Quiz | null> => {
  const connection = await getConnection();

  const quizQueryString = `
  SELECT 
    quiz.\`index\`,
    quiz.title,
    quiz_item.\`index\` as itemIndex,
    quiz_item.content
  FROM quiz
  JOIN quiz_item ON quiz.id = quiz_item.quiz_id
  WHERE quiz.\`index\` = ${index};
  `;
  const [queryResult] = await connection.query<RowDataPacket[]>(quizQueryString);

  connection.release();

  if (queryResult.length < 1) {
    return null;
  }

  const result: Quiz = {
    index: queryResult[0].index,
    title: queryResult[0].title,
    contents: queryResult
      .sort(({ itemIndex: a }, { itemIndex: b }) => a - b)
      .map(({ content }) => content),
  };

  return result;
};
