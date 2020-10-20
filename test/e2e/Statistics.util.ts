import { EpisodeVoteField, StaticVoteField } from '@src/domain/value-object/VoteField';

export const getVoteStatisticsSample = (field: EpisodeVoteField | StaticVoteField) => [
  { producer: `${field} value 1`, count: 20 },
  { producer: `${field} value 2`, count: 18 },
  { producer: `${field} value 3`, count: 7 },
  { producer: `${field} value 4`, count: 6 },
  { producer: `${field} value 5`, count: 5 },
  { producer: `${field} value 6`, count: 1 },
  { producer: `${field} value 7`, count: 1 },
];
