import * as SongRepository from '@src/repository/Song';

import * as sheets from './sheets';

export const migrateProducer = async () => {
  throw new Error('Not Implemented');
};

export const migrateSong = async (season: number) => {
  const songs = await sheets.getSeasonData(season);

  await SongRepository.AddSongs(songs);
};
