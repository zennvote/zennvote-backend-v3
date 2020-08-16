import { Request, Response, NextFunction } from 'express';

import * as VoteApp from '@src/application/Vote';

export const PostVoteHandler = async (req: Request, res: Response, next: NextFunction) => {
  const vote = req.body;
  const result = await VoteApp.saveVotes(vote);

  res.json({ success: true, result });
};
