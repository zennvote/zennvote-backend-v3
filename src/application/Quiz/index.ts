import * as QuizRepository from '@src/repository/Quiz';
import { QuizNotFoundError } from './errors';

export const getQuizzes = () => QuizRepository.getQuizzes();

export const getQuizByIndex = async (index: number) => {
  const quiz = await QuizRepository.getQuizByIndex(index);

  if (quiz === null) {
    throw new QuizNotFoundError({ index });
  }

  return quiz;
};
