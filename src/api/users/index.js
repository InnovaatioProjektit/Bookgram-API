import { Router } from 'express'

import login from './login.js'
import logout from './logout.js'

/**
 * Kayttajahallinta ja kirjautuminen
 * 
 * @module users
 * @category API
 */

export default (async () => {
    Router.post("/", login)
    Router.get("/", logout)
})