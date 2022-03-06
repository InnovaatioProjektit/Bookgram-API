import { Router } from 'express'
import users from './users/index.js'

const router = Router();

export default (() => {
    router.use("/users", users)
})