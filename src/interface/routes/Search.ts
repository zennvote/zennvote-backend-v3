import * as express from 'express';
import * as SearchHandler from '@src/handler/Search';
import SearchSongByIndexValidator from '@src/handler/Search/SearchSongByIndexValidator'

const router = express.Router();

router.get('/song/episode', SearchSongByIndexValidator, SearchHandler.SearchSongByIndexHandler);

export default router;
