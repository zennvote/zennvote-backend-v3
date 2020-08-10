import * as express from 'express';
import * as morgan from 'morgan';
import * as pe from 'pretty-error';

const PrettyError = new pe();

import ChoiceRouter from './routes/Choice';
import logger from '@src/infrastructure/logger/logger';

const app = express();

app.use(express.json());
app.use(morgan('combined', {
  stream: { write: (message) => logger.http(message) }
}));

app.get('/', (req, res) => res.json('Hello World'));

app.use('/choice', ChoiceRouter);

app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const prettyError = PrettyError.render(error);

  logger.error(prettyError);
  res.status(500).json({ message: 'Unexpected Error' });
})

export default app;
