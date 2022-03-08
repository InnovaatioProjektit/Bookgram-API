import { Router } from 'express'
import { body, param, validationResult } from 'express-validator';

import login from './login.js'
import logout from './logout.js'
import register from './register.js'

const router = Router();

/**
 * Kayttajahallinta, kuten kirjautuminen ja rekisterointi
 * 
 * @module users
 * @category API
 * @route {POST} /api/users
 */
 router.post("/", login)
 router.get("/", logout)
 router.post("/register", body('username').not().isEmpty().trim().escape().custom(value => {


 })
 
 
 register)



export default router;