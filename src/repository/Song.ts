import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { getConnection } from '@src/infrastructure/db/connection';

import Song from '@src/domain/Song';
import Episode from '@src/domain/value-object/Episode';

export const AddSongs = async (songs: Song[]) => {
  const connection = await getConnection();

  if (songs.length === 0) {
    return;
  }

  const queryString = `
  INSERT INTO song (\`episode_episode\`, \`episode_index\`, \`title\`, \`uploader\`, \`votable\`, \`isrookie\`) VALUES
  ${songs
    .map(({ episode, title, uploader, votable, isRookie }) => (
      `(${episode.episode}, ${episode.index}, "${title.replace(/"/g, '\\"')}", "${uploader.replace(/"/g, '\\"')}", ${votable}, ${isRookie})`
    ))
    .join(', ')}
  `;

  await connection.beginTransaction();

  try {
    await connection.query<ResultSetHeader>(queryString);
    await connection.commit();

    connection.release();
  } catch (err) {
    await connection.rollback();

    connection.release();

    throw err;
  }
};

export const GetSong = async ({ episode, index }: Episode): Promise<Song | null> => {
  const connection = await getConnection();

  const queryString = `SELECT * FROM song WHERE \`episode_episode\`=${episode} and \`episode_index\`=${index}`;

  const [queryResult] = await connection.query<RowDataPacket[]>(queryString);
  if (queryResult.length === 0) {
    return null;
  }
  const { title, uploader, votable, isrookie: isRookie } = queryResult[0];
  return {
    episode: { episode, index }, title, uploader, votable, isRookie,
  };
};
