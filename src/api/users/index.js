const router = require("express").Router();

import login from "./login"
import logout from "./logout"

/**
 * Kayttajahallinta ja kirjautuminen
 * 
 * @module users
 * @category API
 */

export default async(() => {
    router.post("/", login)
    router.get("/", logout)
})