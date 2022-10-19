import { Router } from 'express'
import { body, param, validationResult } from 'express-validator';
import {findUserById, findUserByName} from '../users/model/user.js'

import { authentication } from '../../auth/pwd.js';

import login from './login.js'
import logout from './logout.js'
import register from './register.js'
import ValidationResponse from '../../utils/ValidationResponse.js';
import { getBooksByCollection } from '../books/model/book.js';
import collection from '../books/collection.js';

/**
 * Kayttajahallinta, kuten kirjautuminen ja rekisterointi
 * 
 * @module users
 * @category API
 * @route {POST} /api/users
 */

const router = Router();

/**
 * Test protocol
 */
router.get("/test", (request, response) => {
    return response.status(200).json({"message": "test complete" })
})

/**
 * Käyttäjän sisäänkirjautuminen. Salasanan pitää olla vähintään 4 kirjaimen pituinen
 * @route {POST} /api/users/login
 */
router.post("/login",
    body("username").not().isEmpty().trim(),
    body("password").not().isEmpty().isLength({min: 4, max: 128}).trim(),
    body("remember").not().isEmpty().isBoolean(), 
    login)

/**
 * Uloskirjautuminen tuhoaa käyttäjän avaimen (token)
 * @route {POST} api/users/logout
 */
router.post("/logout", authentication, logout)


/**
 * Luo uusi käyttäjätunnus. Salananan pitää olla vähintään 4 kirjaimen pituinen
 * @route {POST} /api/users/adduser
 */
router.post("/adduser", 
    body('username').not().isEmpty().trim().escape().custom(async value => {
        const user = await findUserByName(value);
        if (user) {
            return Promise.reject('Käyttäjätunnus on jo olemassa.');
        }
    }),
    body('password').trim().escape().isLength({min: 4, max: 128}), 
    body('fullname').trim().escape().isLength({min: 2, max: 25}),
    body('lastname').trim().escape().isLength({min: 2, max: 25}), register)



    
/**
 * Palauta käyttäjän yleistiedot, haku käyttäjätunnuksella
 * @route {POST} /api/users/:userID
 */
router.post("/:userID", param("userID").not().isEmpty().isNumeric(), authentication, async (request, response) => {
    const errResponse = ValidationResponse(request, response)
    if(errResponse != null){
        return errResponse
    }

    const row = await findUserById(request.params.userID)
    if(row != null){
        return response.status(200).json({rows: row, message: "OK"})
    }

    return response.status(401).json({message: "No userdata was found"})

})


/**
 * Hae kokoelman tunnuksen avulla kokoelma, joka kuuluu käyttäjälle
 * ja palauta kokoelman teokset. (kokoelmat ovat käyttäjä-kokoelma-avaimesta 
 * riippuvaisia, eli omistaja voi olla  eri vaikka nimi on sama)
 * 
 * @route {GET} /api/users/adduser
 */
router.get("/:userid/collections/:shelf/volumes", 
param('userid').not().isEmpty(),
param('shelf').trim().escape(), collection)

export default router;


