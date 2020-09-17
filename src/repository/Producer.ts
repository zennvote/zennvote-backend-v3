import Producer from '@src/domain/Producer';
import { getConnection } from '@src/infrastructure/db/connection';
import { ResultSetHeader } from 'mysql2';

export const AddProducers = async (producers: Producer[]) => {
  const connection = await getConnection();

  if (producers.length === 0) {
    return;
  }

  await connection.beginTransaction();

  try {
    // eslint-disable-next-line no-restricted-syntax
    for (const producer of producers) {
      console.log(producer);
      const producerQueryString = `INSERT INTO producer (\`name\`) VALUE ('${producer.name}')`;

      // eslint-disable-next-line no-await-in-loop
      const [queryResult] = await connection.query<ResultSetHeader>(producerQueryString);

      const producerId = queryResult.insertId;
      const uploadsQueryString = `INSERT INTO upload_info (\`producer_id\`, \`episode_episode\`, \`episode_index\`) VALUES
      ${producer.songs.map(({ episode, index }) => `(${producerId}, ${episode}, ${index})`).join(', ')};`;

      // eslint-disable-next-line no-await-in-loop
      await connection.query<ResultSetHeader>(uploadsQueryString);
    }

    console.log('FIN');

    await connection.commit();
    console.log('commited');

    connection.release();
  } catch (err) {
    await connection.rollback();

    connection.release();

    throw err;
  }
};
