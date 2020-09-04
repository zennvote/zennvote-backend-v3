import Choice from '@src/domain/Choice';
import Quiz from '@src/domain/Quiz';

export const getSampleQuiz = (index: number = 0): Quiz => ({ title: 'sample', index, contents: ['choices1', 'choices2', 'choices3'] });
