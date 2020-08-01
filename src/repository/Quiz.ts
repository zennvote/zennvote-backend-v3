import Quiz from '@src/domain/Quiz';

export const getQuizzes = (): Promise<Quiz[]> => {
  throw new Error('Not Implemented');
};

export const getQuizByIndex = (index: number): Promise<Quiz | null> => {
  throw new Error('Not Implemented');
};
