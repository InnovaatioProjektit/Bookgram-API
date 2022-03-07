import { Router } from 'express'

import login from './login.js'
import logout from './logout.js'
import register from './register.js'

const router = Router();

/**
 * Kayttajahallinta, kuten kirjautuminen ja rekisterointi
 * 
 * @module users
 * @category API
 */
 router.post("/", login)
 router.get("/", logout)
 router.post("/", register)

export default router;