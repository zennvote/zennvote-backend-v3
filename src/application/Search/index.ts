import * as SongRepository from '@src/repository/Song';

import Episode from '@src/domain/value-object/Episode';

import { SongNotFoundError } from './errors';

export const searchSongByProducer = async (episode: Episode) => {
  const song = await SongRepository.GetSong(episode);

  if (song === null) {
    throw new SongNotFoundError(episode);
  }

  return song;
}