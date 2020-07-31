import Choice from '@src/domain/Choice';

export const getChoices = (): Promise<Choice[]> => {
  throw new Error('Not Implemented');
};

export const getChoiceByName = (name: String): Promise<Choice | null> => {
  throw new Error('Not Implemented');
};
