import * as VoteRepository from '@src/repository/Vote';

export const getStatistics = async () => ({
  pitch: await VoteRepository.getEpisodeVoteStatistics('pitch'),
  voice: await VoteRepository.getEpisodeVoteStatistics('voice'),
  funny: await VoteRepository.getEpisodeVoteStatistics('funny'),
  content: await VoteRepository.getEpisodeVoteStatistics('content'),
  original: await VoteRepository.getEpisodeVoteStatistics('original'),

  sleep: await VoteRepository.getEpisodeVoteStatistics('sleep'),
  unit: await VoteRepository.getStaticVoteStatistics('unit'),
  rookie: await VoteRepository.getStaticVoteStatistics('rookie'),
  grow: await VoteRepository.getStaticVoteStatistics('grow'),

  master: await VoteRepository.getStaticVoteStatistics('master'),
});
