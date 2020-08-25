/* eslint-disable newline-per-chained-call */
import { body } from 'express-validator';

const episodeValidator = (key: string, max: number, min: number = 1) => [
  body(key)
    .isArray().withMessage('should be array')
    .isArray({ max }).withMessage(`should be under ${max}`)
    .isArray({ min }).withMessage(`${min} item required`),

  body(`${key}.*.episode`)
    .isInt().withMessage('should be integer')
    .isInt({ min: 101, max: 110 }).withMessage('should be season 10 episode (101-110)'),
  body(`${key}.*.index`)
    .isInt({ min: 1 }).withMessage('should be natural number'),
];

const selectionValidator = (key: string, max: number, min: number = 1) => [
  body(key)
    .isArray().withMessage('should be array')
    .isArray({ max }).withMessage(`should be under ${max}`)
    .isArray({ min }).withMessage(`${min} item required`),

  body(`${key}.*`).isString().withMessage('should be string'),
];

const validator = [
  body('email').isEmail(),

  body('quiz')
    .isArray().withMessage('should be array')
    .isArray({ min: 9, max: 9 }).withMessage('should have 9 item'),
  body('quiz.*')
    .isInt().withMessage('should be integer'),

  ...episodeValidator('pitch', 5),
  ...episodeValidator('voice', 5),
  ...episodeValidator('funny', 3),
  ...episodeValidator('content', 3),
  ...episodeValidator('original', 3),

  ...episodeValidator('sleep', 3),
  ...selectionValidator('unit', 3, 3),
  ...selectionValidator('rookie', 3, 2),
  ...selectionValidator('grow', 3, 0),

  ...selectionValidator('master', 3),

  body('custom')
    .optional()
    .isArray().withMessage('should be array'),
  body('custom.*.episode.episode')
    .isInt().withMessage('should be integer')
    .isInt({ min: 101, max: 110 }).withMessage('should be season 10 episode (101-110)'),
  body('custom.*.episode.index')
    .isInt({ min: 1 }).withMessage('should be natural number'),
  body('custom.*.content')
    .isString().withMessage('should be string'),

  body('message').optional()
    .isArray().withMessage('should be array'),
  body('message.*.name')
    .isString().withMessage('should be string'),
  body('message.*.content')
    .isString().withMessage('should be string'),
];

export default validator;
