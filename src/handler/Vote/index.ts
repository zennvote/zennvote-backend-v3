import { Request, Response, NextFunction } from 'express';

import * as VoteApp from '@src/application/Vote';
import * as VoteError from '@src/application/Vote/errors';
import { validationResult } from 'express-validator';

export const PostVoteHandler = async (req: Request, res: Response, next: NextFunction) => {
  const vote = req.body;

  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(400).json({ success: false, errors: validation.array() });
  }

  try {
    const result = await VoteApp.saveVotes(vote);

    res.json({ success: true, result });
  } catch (error) {
    if (error instanceof VoteError.VoteDuplicatedError) {
      res.status(422).json({ success: false, message: 'vote email already existing' });
    } else {
      next(error);
    }
  }
};
