import * as express from 'express';
import * as QuizHandler from '@src/handler/Quiz';

const router = express.Router();

router.get('/', QuizHandler.GetQuizzesHandler);
router.get('/:index', QuizHandler.GetQuizByIndexHandler);

export default router;
