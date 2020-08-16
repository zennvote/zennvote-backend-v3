import * as VoteRepository from '@src/repository/Vote';
import Vote from '@src/domain/Vote';

export const saveVotes = (vote: Vote) => VoteRepository.saveVote(vote);
