import { Router } from 'express'
import { body, param, validationResult } from 'express-validator';
import { authentication } from '../../auth/pwd.js';

import reviews, { addreview } from './reviews.js';

/**
 * Arvostelujen hallinta
 * 
 * @module reviews
 * @category API
 * @route {GET} /api/reviews
 */

 const router = Router();

 

 export default router;