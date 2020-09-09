import Song from '@src/domain/Song';
import Episode from '@src/domain/value-object/Episode';

export const getSampleQuiz = (episode: Episode = { episode: 0, index: 0 }): Song => (
  {
    episode,
    title: 'test title',
    uploader: 'test uploader',
    votable: true,
    isRookie: false,
  }
);
