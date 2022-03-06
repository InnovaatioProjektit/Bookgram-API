const users = require('./users/index.js')

export default (() => {
    app.use("/users", users)
})