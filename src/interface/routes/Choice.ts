import * as express from 'express';
import * as ChoiceHandler from '@src/handler/Choice';

const router = express.Router();

router.get('/', ChoiceHandler.GetChoicesHandler);
router.get('/:name', ChoiceHandler.GetChoiceByNameHandler);

export default router;
