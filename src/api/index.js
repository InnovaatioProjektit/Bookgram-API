import { Router } from 'express'
import users from './users/index.js'

export default Router().use("/users", users)