import { ResultSetHeader } from 'mysql2/promise';
import { getConnection } from '@src/infrastructure/db/connection';

import Song from '@src/domain/Song';

export const AddSongs = async (songs: Song[]) => {
  const connection = await getConnection();

  if (songs.length === 0) {
    return;
  }

  const queryString = `
  INSERT INTO song (\`episode_episode\`, \`episode_index\`, \`title\`, \`uploader\`, \`votable\`, \`isrookie\`) VALUES
  ${songs.map(({ episode, title, uploader, votable, isRookie }) => `(${episode.episode}, ${episode.index}, "${title}", "${uploader}", ${votable}, ${isRookie})`)}
  `;

  await connection.beginTransaction();

  try {
    await connection.query<ResultSetHeader>(queryString);

    connection.release();
  } catch (err) {
    await connection.rollback();

    connection.release();

    throw err;
  }
};
