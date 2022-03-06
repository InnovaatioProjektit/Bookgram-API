import users from './users/index.js'

export default ((app) => {
    app.use("/users", users)
})