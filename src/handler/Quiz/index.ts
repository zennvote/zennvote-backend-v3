import { Request, Response, NextFunction } from 'express';

import * as QuizApp from '@src/application/Quiz';
import { QuizNotFoundError } from '@src/application/Quiz/errors';

export const GetQuizzesHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quizzes = await QuizApp.getQuizzes();

    res.json(quizzes);
  } catch (err) {
    next(err);
  }
};

export const GetQuizByIndexHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { index } = req.params;

  try {
    const quiz = await QuizApp.getQuizByIndex(parseInt(index, 10));

    res.json(quiz);
  } catch (err) {
    if (err instanceof QuizNotFoundError) {
      const { message, query } = err;

      res.status(404).json({ message, query });
    } else {
      next(err);
    }
  }
};
