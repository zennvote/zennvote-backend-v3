import * as ChoiceRepository from '@src/repository/Choice';
import { ChoiceNotFoundError } from './errors';

export const getChoices = () => ChoiceRepository.getChoices();

export const getChoiceByName = async (name: string) => {
  const choice = await ChoiceRepository.getChoiceByName(name);

  if (choice === null) {
    throw new ChoiceNotFoundError({ name });
  }

  return choice;
};
