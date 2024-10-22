import { body } from 'express-validator';
import { validateRequest } from './validators'; // Assuming this is your shared validation function

export const createTeamValidator = validateRequest([
  body('teamName').notEmpty().withMessage('Team name is required'),
  body('members').isArray().withMessage('Members should be an array of user IDs')
]);
