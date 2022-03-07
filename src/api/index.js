import { Router } from 'express'
import users from './users/index.js'

/**
 * Sovelluksen rest-pyyntöjen reititin
 * 
 * @category API
 */
export default Router().use("/users", users)