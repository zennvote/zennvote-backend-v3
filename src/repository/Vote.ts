import { RowDataPacket, ResultSetHeader, PoolConnection } from 'mysql2/promise';

import Vote from '@src/domain/Vote';
import Episode from '@src/domain/value-object/Episode';

import { getConnection } from '@src/infrastructure/db/connection';
import { EpisodeVoteField, StaticVoteField } from '@src/domain/value-object/VoteField';

export const isEmailDuplicated = async (email: string): Promise<boolean> => {
  const connection = await getConnection();

  const queryString = `SELECT email FROM vote WHERE email="${email}"`;
  const [queryResult] = await connection.query<RowDataPacket[]>(queryString);

  connection.release();

  return queryResult.length > 0;
};

const createVote = async (connection: PoolConnection, email: string) => {
  const queryString = `INSERT INTO vote (email) VALUES ('${email}')`;
  const [queryResult] = await connection.query<ResultSetHeader>(queryString);

  return queryResult.insertId;
};

const createVoteQuiz = async (connection: PoolConnection, voteId: number, quizzes: number[]) => {
  if (quizzes.length === 0) {
    return;
  }

  const queryString = `
  INSERT INTO vote_quiz (\`vote_id\`, \`index\`, \`value\`) VALUES
  ${quizzes.map((quiz, index) => `(${voteId}, ${index}, ${quiz})`).join(', ')};
  `;

  await connection.query<ResultSetHeader>(queryString);
};

const createVoteEpisodes = async (
  connection: PoolConnection, voteId: number, table: string, episodes: Episode[],
) => {
  if (episodes.length === 0) {
    return;
  }

  const queryString = `
  INSERT INTO ${table} (\`vote_id\`, \`episode_episode\`, \`episode_index\`) VALUES
  ${episodes.map((episode) => `(${voteId}, ${episode.episode}, ${episode.index})`).join(', ')};
  `;

  await connection.query<ResultSetHeader>(queryString);
};

const createVoteStrings = async (
  connection: PoolConnection, voteId: number, table: string, values: string[],
) => {
  if (values.length === 0) {
    return;
  }

  const queryString = `
  INSERT INTO ${table} (\`vote_id\`, \`value\`) VALUES
  ${values.map((value) => `(${voteId}, "${value}")`).join(', ')};
  `;

  await connection.query<ResultSetHeader>(queryString);
};

const createVoteCustom = async (
  connection: PoolConnection, voteId: number, values: { episode: Episode, content: string }[],
) => {
  if (values.length === 0) {
    return;
  }

  const queryString = `
  INSERT INTO vote_custom (\`vote_id\`, \`episode_episode\`, \`episode_index\`, \`content\`) VALUES
  ${values.map(({ episode, content }) => `(${voteId}, ${episode.episode}, ${episode.index}, "${content}")`).join(', ')};
  `;

  await connection.query<ResultSetHeader>(queryString);
};

const createVoteMessage = async (
  connection: PoolConnection, voteId: number, values: { name: string, content: string }[],
) => {
  if (values.length === 0) {
    return;
  }

  const queryString = `
  INSERT INTO vote_message (\`vote_id\`, \`name\`, \`message\`) VALUES
  ${values.map(({ name, content }) => `(${voteId}, "${name}", "${content}")`).join(', ')};
  `;

  await connection.query<ResultSetHeader>(queryString);
};

export const saveVote = async (vote: Vote): Promise<Vote> => {
  const connection = await getConnection();

  await connection.beginTransaction();

  try {
    const voteId = await createVote(connection, vote.email);

    await createVoteQuiz(connection, voteId, vote.quiz);

    const episodeVotes = ['pitch', 'voice', 'funny', 'content', 'original', 'sleep'];
    await Promise.all(
      episodeVotes.map((table) => createVoteEpisodes(connection, voteId, `vote_${table}`, vote[table])),
    );

    const stringVotes = ['unit', 'rookie', 'grow', 'master'];
    await Promise.all(
      stringVotes.map((table) => createVoteStrings(connection, voteId, `vote_${table}`, vote[table])),
    );

    await createVoteCustom(connection, voteId, vote.custom);
    await createVoteMessage(connection, voteId, vote.message);

    await connection.commit();
  } catch (err) {
    await connection.rollback();
    connection.release();

    throw err;
  }

  connection.release();

  return vote;
};

export const getEpisodeVoteStatistics = async (field: EpisodeVoteField) => {
  const connection = await getConnection();

  const queryString = `
  SELECT uploader, COUNT(*) as count FROM vote_${field} as vote
  LEFT OUTER JOIN song ON (
    song.episode_episode = vote.episode_episode AND
      song.episode_index = vote.episode_index
  )
  GROUP BY uploader
  ORDER BY COUNT(*) DESC;
  `;
  const [queryResult] = await connection.query<RowDataPacket[]>(queryString);

  connection.release();

  const result = queryResult.map(({ uploader, count }) => ({
    producer: uploader as string,
    count: count as number,
  }));

  return result;
};

export const getStaticVoteStatistics = async (field: StaticVoteField) => {
  const connection = await getConnection();

  const queryString = `
  SELECT value, COUNT(*) as count FROM vote_${field}
  GROUP BY value
  ORDER BY COUNT(*) DESC;
  `;
  const [queryResult] = await connection.query<RowDataPacket[]>(queryString);

  connection.release();

  const result = queryResult.map(({ value, count }) => ({
    producer: value as string,
    count: count as number,
  }));

  return result;
};
