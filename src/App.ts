import * as express from 'express';
import { GetChoicesHandler, GetChoiceByNameHandler } from './handler/Choice';

const app = express();

app.use(express.json());

app.get('/v1/choice', GetChoicesHandler);
app.get('/v1/choice/:name', GetChoiceByNameHandler);

app.listen(4000);

export default app;
