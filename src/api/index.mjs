const users = require('./users/index.mjs')

export default (() => {
    app.use("/users", users)
})