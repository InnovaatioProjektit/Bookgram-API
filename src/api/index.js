import { Router } from 'express'
import users from './users/index.js'
import books from './books/index.js'
import reviews from './reviews/index.js'

/**
 * Sovelluksen REST-pyyntöjen reititin
 * 
 * @category API
 */
const router = Router();

router.use("/users", users)
router.use("/books", books)
router.use("/reviews", reviews)

export default router