import { query } from 'express-validator';

const validator = [
  query('episode').notEmpty().isInt(),
  query('index').notEmpty().isInt(),
];

export default validator;
