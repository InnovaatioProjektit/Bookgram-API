import { Router } from 'express'
import { body, param, validationResult } from 'express-validator';
import { authentication } from '../../auth/pwd.js';
import booksAPI from '../../utils/booksAPI.js';

import collection, { 
  collections, 
  volume, 
  addVolume, 
  removeVolume, 
  createUserCollection, 
  removeUserCollection, 
  clearUserCollection, 
  collectionsByBook, 
  collectionsByBookAndUser,
  collectionLikes, 
  collectionLikesAdd,
  collectionByID} from './collection.js';



/**
 * Kirjojen hallinta, kuten kirjahylly, arvostelut
 * 
 * @module books
 * @category API
 * @route {GET} /api/books
 */

const router = Router();


/**
 * Etsi kirja tunnuksella Google Api:sta
 * @route {GET} /books/volume
 */
 router.get("/volume", async (request, response) => {
  const data = await booksAPI.lookup(request.query.q)
  return response.status(200).json(data)
})

 /**
 * Hae kaikki kirjan tiedot tagilla. Riippumaton kokoelmasta
 * @route {GET} /books/collections/:id
 */
router.get("/volume/:tag/", volume)

 /**
 * Etsi kirjoja nimellä Google Api:sta
 * @route {GET} /books/volumes?q=""
 */
router.get("/volumes", async (request, response) => {
  const data = await booksAPI.search(request.query.q)
  return response.status(200).json(data)
})


 /**
 * Lisää kirja käyttäjän kokoelmaan
 * @route {POST} /books/collections/:shelf/addBook
 */
router.post("/collections/:shelf/addBook",
  param("shelf").isNumeric(),
  body("shelf").isEmpty(),
  body("tag").not().isEmpty().trim(), authentication, addVolume)


  /**
   * DELETE	/books/collections/:shelf/removeBook
   * @route {DELETE} /books/collections/:shelf/removeBook
   */
router.post("/collections/:shelf/removeBook",
   param("shelf").isNumeric(), authentication, removeVolume)



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
  body("shelf").isInt(), authentication, removeUserCollection)


/**
 * Tyhjennä käyttäjän kokoelma
 * @route {POST} /books/collections/clearCollection
 */
router.post("/collections/clearCollection",
  body("shelf").isInt(), authentication, clearUserCollection)


/**
 * Hae kaikki käyttäjän kokoelmat
 * @route {GET} /books/collections
 */
router.get("/collections", authentication, collections)


/**
 * Hae kaikki kokoelmat, jossa haettava kirja sijaitsee
 * @route {GET} books/collections/book/:tag
 */
router.get("/collections/book/:tag", 
  param("tag").isString(), authentication, collectionsByBook)

  /**
 * Hae kaikki käyttäjän kokoelmat, jossa haettava kirja sijaitsee
 * @route {POST} books/collections/book/:tag
 */
router.post("/collections/book/:tag", 
param("tag").isString(), authentication, collectionsByBookAndUser)

/**
 * Hae kaikki käyttäjän kokoelman kirjat
 * @route {GET} /books/collections/:shelf/volumes
 */
router.get("/collections/:shelf/volumes", param('shelf').isInt(), authentication, collection)

/**
 * Hae kokoelman tykkäykset
 * @route {GET} /books/collections/:shelf/likes
 */
router.get("/collections/:shelf/likes", param('shelf').isInt(), authentication, collectionLikes)


 /**
 * Päivitä kokoelman tykkäysmäärän. (1 lisää, -1 poistaa)
 * @route {POST} /books/collections/:shelf/likes
 */
router.post("/collections/:shelf/likes", 
body("count").isInt({min: -1, max: 1}), param('shelf').isInt(), authentication, collectionLikesAdd)

/**
 * Hae käyttäjän kokoelman tiedot
 * @route {GET} /books/collections/:shelf
 */
 router.get("/collections/:shelf", param("shelf").isInt(), authentication, collectionByID)

 /**
 * Hae käyttäjän kokoelman tähditetyt kirjat
 * @route {GET} /books/collections/:shelf/starred
 * FIXME
 */
router.get("/collections/:shelf/starred", param("shelf").isInt(), authentication, (request, response) => {
  const res = collection(request, response);
  console.log("TEST AND FIX ME")
  console.log(res)
})


export default router;