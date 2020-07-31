import Episode from './value-object/Episode';

type Song = {
  episode: Episode;
  title: string;
  uploader: string;
  votable: boolean;
  isRookie: boolean;
}

export default Song;
