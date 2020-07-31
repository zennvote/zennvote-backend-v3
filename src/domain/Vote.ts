import Episode from './value-object/Episode';

type Vote = {
  email: string;

  problem: number[];

  pitch: Episode[];
  voice: Episode[];
  funny: Episode[];
  content: Episode[];
  original: Episode[];

  sleep: Episode[];
  unit: string[];
  rookie: string[];
  grow: string[];

  master: string[];

  custom: { episode: Episode, content: string }[];
  message: { name: string, content: string }[];
}

export default Vote;
