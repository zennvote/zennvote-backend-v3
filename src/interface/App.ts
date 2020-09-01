import * as express from 'express';
import * as morgan from 'morgan';
import * as PE from 'pretty-error';

import logger from '@src/infrastructure/logger/logger';
import ChoiceRouter from './routes/Choice';
import VoteRouter from './routes/Vote';

const PrettyError = new PE();

const app = express();

app.use(express.json());
app.use(morgan('combined', {
  stream: { write: (message) => logger.http(message) },
}));

app.get('/', (req, res) => res.json('Hello World'));

app.use('/choice', ChoiceRouter);
app.use('/vote', VoteRouter);

app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const prettyError = PrettyError.render(error);

  logger.error(prettyError);
  res.status(500).json({ message: 'Unexpected Error' });
});

export default app;
