import { Request, Response, NextFunction } from 'express';

import * as SearchApp from '@src/application/Search';
import { SongNotFoundError } from '@src/application/Search/errors';
import { validationResult } from 'express-validator';
import Episode from '@src/domain/value-object/Episode';

export const SearchSongByIndexHandler = async (req: Request, res: Response, next: NextFunction) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(400).json({ success: false, errors: validation.array() });
  }

  const episode: Episode = {
    episode: parseInt(req.query.episode as string, 10),
    index: parseInt(req.query.index as string, 10),
  };
  try {
    const result = await SearchApp.searchSongByEpisode(episode);

    res.json({ success: true, result });
  } catch (error) {
    if (error instanceof SongNotFoundError) {
      const { message, query } = error;

      res.status(404).json({ message, query });
    } else {
      next(error);
    }
  }
};
