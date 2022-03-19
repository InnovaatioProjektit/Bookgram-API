import { Router } from 'express'
import users from './users/index.js'
import books from './books/index.js'

/**
 * Sovelluksen rest-pyyntöjen reititin
 * 
 * @category API
 */
const router = Router();

router.use("/users", users)
router.use("/books", books)

export default router