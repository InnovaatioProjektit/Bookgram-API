import { Router } from 'express'
import { body, param, validationResult } from 'express-validator';
import { authentication } from '../../auth/pwd.js';

import collection, { collections, volume, addVolume } from './collection.js';
import reviews, { addreview } from './reviews.js';



/**
 * Kirjojen hallinta, kuten kirjahylly, arvostelut
 * 
 * @module books
 * @category API
 * @route {GET} /api/books
 */

const router = Router();

 /**
 * Hae kaikki kirja tagilla. Riippumaton kokoelmasta
 */
router.get("/volume/:tag", authentication, volume)



 /**
  * Hae käyttäjä id:llä kaikki arvostelut
  */
router.get("/reviews/:id", authentication, reviews)

/**
 * lisää uusi arvostelu
 */
router.post("/reviews/addreview",
    body("user").isNumeric(),
    body("book").isNumeric(),
    body("score").isNumeric(), authentication, addreview)

 /**
  * hae kirjakokoelman id:llä
  */
router.get("/collections/:id", authentication, collections)

 

/**
 * hae kaikki kirjakokoelmaan kuuluvat kirjat
 */
router.get("/collection/:id",
  param('id').isNumeric(), authentication, collection)


/**
 * Lisää kirja käyttäjän kokoelmaan
 */
 router.post("/collection",
  body("user").isNumeric(),
  body("tag").not().isEmpty().trim(), authentication, addVolume)


 

export default router;