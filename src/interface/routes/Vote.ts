import * as express from 'express';
import * as VoteHanlder from '@src/handler/Vote';

const router = express.Router();

router.post('/', VoteHanlder.PostVoteHandler);

export default router;
