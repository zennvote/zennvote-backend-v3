import Vote from '@src/domain/Vote';

export const getSampleVote = (): Vote => ({
  email: 'test@nomail.com',
  quiz: [1, 2, 3, 1, 2, 3, 1, 2, 3],

  pitch: [
    { episode: 101, index: 1 },
    { episode: 101, index: 2 },
    { episode: 101, index: 3 },
  ],
  voice: [
    { episode: 102, index: 1 },
    { episode: 102, index: 2 },
    { episode: 102, index: 3 },
  ],
  funny: [
    { episode: 103, index: 1 },
    { episode: 103, index: 2 },
    { episode: 103, index: 3 },
  ],
  content: [
    { episode: 104, index: 1 },
    { episode: 104, index: 2 },
    { episode: 104, index: 3 },
  ],
  original: [
    { episode: 105, index: 1 },
    { episode: 105, index: 2 },
    { episode: 105, index: 3 },
  ],

  sleep: [
    { episode: 101, index: 1 },
    { episode: 101, index: 2 },
    { episode: 101, index: 3 },
  ],
  unit: ['test1', 'test2', 'test3'],
  rookie: ['test1', 'test2', 'test3'],
  grow: ['test1', 'test2', 'test3'],

  master: ['test1', 'test2', 'test3'],

  custom: [
    { episode: { episode: 101, index: 10 }, content: 'test content1' },
    { episode: { episode: 101, index: 11 }, content: 'test content2' },
    { episode: { episode: 101, index: 12 }, content: 'test content3' },
  ],
  message: [
    { name: 'test1', content: 'test content1' },
    { name: 'test2', content: 'test content2' },
    { name: 'test3', content: 'test content3' },
  ],
});
