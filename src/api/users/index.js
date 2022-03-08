import { Router } from 'express'
import { body, param, validationResult } from 'express-validator';
import {findUserByName} from '../users/model/user.js'

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
 router.post("/", 
    body("email").not().isEmpty().isLength({min: 3}).trim(),
    body("password").not().isEmpty().trim(),
login)


router.get("/", logout)

router.get("/adduser", 
    body('username').not().isEmpty().trim().escape().custom(async value => {
        const user = await findUserByName(value);
        if (user) {
            return Promise.reject('Käyttäjätunnus on jo olemassa.');
        }
    }),
    body('password').trim().isLength({ min: 8 }), register)

export default router;