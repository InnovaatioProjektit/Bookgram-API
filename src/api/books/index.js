import { Router } from 'express'
import { body, param, validationResult } from 'express-validator';
import { authentication } from '../../auth/pwd.js';

import collection, { collections, volume, addVolume, removeVolume, createUserCollection, removeUserCollection, clearUserCollection } from './collection.js';
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
 * @route {GET} /books/collections/:id
 * TODO - not finished
 */
router.get("/volume/:tag", authentication, volume)


 /**
 * Lisää kirja käyttäjän kokoelmaan
 * @route {POST} /books/collections/:shelf/addBook
 */
router.post("/collections/:shelf/addBook",
  body("shelf").isNumeric(),
  body("tag").not().isEmpty().trim(), authentication, addVolume)


  /**
   * DELETE	/books/collections/:shelf/removeBook
   * @route {DELETE} /books/collections/:shelf/removeBook
   */
router.delete("/collections/:shelf/removeBook",
   body("shelf").isNumeric(),
   body("tag").not().isEmpty().trim(), authentication, removeVolume)



/**
 * Luo uusi kokoelma käyttäjälle
 * @route {POST} /books/collections/createCollection
 */
router.post("/collections/createCollection",
  body("collectionName").not().isEmpty().isLength({ max: 50})
  .withMessage('Collection description must be between 5 and 50 characters')
  .matches(/^[A-Za-z0-9 .,'!&]+$/)
  .withMessage('Invalid string literal was used'), authentication, createUserCollection)


/**
 * Poista käyttäjän kokoelma
 * @route {DELETE} /books/collections/removeCollection
 */
router.delete("/collections/removeCollection",
  body("shelf").isNumeric(), authentication, removeUserCollection)


/**
 * Tyhjennä käyttäjän kokoelma
 * @route {POST} /books/collections/clearCollection
 */
router.post("/collections/clearCollection",
  body("shelf").isNumeric(), authentication, clearUserCollection)


/**
 * Hae kaikki käyttäjän kokoelmat
 * @route {POST} /books/collections
 */
router.get("/books/collections", authentication, collections)


 /**
  * Hae käyttäjä id:llä kaikki arvostelut
  * TODO
  */
router.get("/reviews/:id", authentication, reviews)

/**
 * lisää uusi arvostelu
 * TODO
 */
router.post("/reviews/addreview",
    body("user").isNumeric(),
    body("book").isNumeric(),
    body("score").isNumeric(), authentication, addreview)

 /**
  * hae kirjakokoelman id:llä
  * TODO
  */
router.get("/collections/:id", authentication, collection)

 

/**
 * hae kaikki kirjakokoelmaan kuuluvat kirjat
 * TODO
 */
router.get("/collection/:id",
  param('id').isNumeric(), authentication, collection)




export default router;