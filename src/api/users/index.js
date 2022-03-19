import { Router } from 'express'
import { body, param, validationResult } from 'express-validator';
import {findUserByName} from '../users/model/user.js'

import { authentication } from '../../auth/pwd.js';

import login from './login.js'
import logout from './logout.js'
import register from './register.js'

/**
 * Kayttajahallinta, kuten kirjautuminen ja rekisterointi
 * 
 * @module users
 * @category API
 * @route {POST} /api/users
 */

const router = Router();


/**
 * Käyttäjän sisäänkirjautuminen. Salasanan pitää olla vähintään 4 kirjaimen pituinen
 */
router.post("/login",
    body("username").not().isEmpty().trim(),
    body("password").not().isEmpty().isLength({min: 4}).trim(),
login)

/**
 * Uloskirjautuminen tuhoaa käyttäjän avaimen (token)
 */
router.post("/logout", authentication, logout)


/**
 * Luo uusi käyttäjätunnus. Salananan pitää olla vähintään 4 kirjaimen pituinen
 */
router.post("/adduser", 
    body('username').not().isEmpty().trim().escape().custom(async value => {
        const user = await findUserByName(value);
        if (user) {
            return Promise.reject('Käyttäjätunnus on jo olemassa.');
        }
    }),
    body('password').trim().isLength({ min: 4 }), register)

export default router;