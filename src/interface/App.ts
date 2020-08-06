import * as express from 'express';
import * as morgan from 'morgan';

import ChoiceRouter from './routes/Choice';
import logger from '@src/infrastructure/logger/logger';

const app = express();

app.use(express.json());
app.use(morgan('combined', {
  stream: { write: (message) => logger.http(message) }
}));

app.get('/', (req, res) => res.json('Hello World'));

app.use('/choice', ChoiceRouter);

export default app;
