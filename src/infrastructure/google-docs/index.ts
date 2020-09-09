import * as SongRepository from '@src/repository/Song';
import * as ProducerRepsository from '@src/repository/Producer';

import * as sheets from './sheets';

export const migrateProducer = async () => {
  const producers = await sheets.getProducerData();

  await ProducerRepsository.AddProducers(producers);
};

export const migrateSong = async (season: number) => {
  const songs = await sheets.getSeasonData(season);

  await SongRepository.AddSongs(songs);
};
