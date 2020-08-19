import * as express from 'express';
import * as VoteHanlder from '@src/handler/Vote';
import PostVoteValidator from '@src/handler/Vote/PostVoteValidator';

const router = express.Router();

router.post('/', PostVoteValidator, VoteHanlder.PostVoteHandler);

export default router;
