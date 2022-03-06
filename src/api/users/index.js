import { Router } from 'express'

import login from './login.js'
import logout from './logout.js'

const router = Router();

/**
 * Kayttajahallinta ja kirjautuminen
 * 
 * @module users
 * @category API
 */

export default (async () => {
    router.post("/", login)
    router.get("/", logout)
})