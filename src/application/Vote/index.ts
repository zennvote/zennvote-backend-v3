import * as VoteRepository from '@src/repository/Vote';
import Vote from '@src/domain/Vote';
import { VoteDuplicatedError } from './errors';

export const saveVotes = async (vote: Vote) => {
  const isDuplicated = await VoteRepository.isEmailDuplicated(vote.email);
  if (isDuplicated) {
    throw new VoteDuplicatedError(vote.email);
  }
  return VoteRepository.saveVote(vote);
};
