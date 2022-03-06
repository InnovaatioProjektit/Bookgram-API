const router = require("express").Router();


const login = require('./login')
const logout = require('./logout')

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