import * as express from 'express';

import ChoiceRouter from './routes/Choice';

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.json('Hello World'));

app.use('/choice', ChoiceRouter);

export default app;
