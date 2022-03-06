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
 router.post("/", login)
 router.get("/", logout)

export default router;