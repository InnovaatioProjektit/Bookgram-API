import { Router } from 'express'
import users from './users/index.js'

export default ((app) => {
    Router.use("/users", users)
})