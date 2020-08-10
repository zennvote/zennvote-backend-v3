import { Request, Response, NextFunction } from 'express';

import * as ChoiceApp from '@src/application/Choice';
import { ChoiceNotFoundError } from '@src/application/Choice/errors';

export const GetChoicesHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const choices = await ChoiceApp.getChoices();

    res.json(choices);
  } catch (err) {
    next(err);
  }
};

export const GetChoiceByNameHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params;

  try {
    const choices = await ChoiceApp.getChoiceByName(name);

    res.json(choices);
  } catch (err) {
    if (err instanceof ChoiceNotFoundError) {
      const { message, query } = err;

      res.status(404).json({ message, query });
    } else {
      next(err);
    }
  }
};
