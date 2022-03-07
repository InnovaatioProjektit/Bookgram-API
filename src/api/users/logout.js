import pool from '../../utils/db.js'

/** 
 * Kirjaa käyttäjä ulko
 * 
 * @name users post
 * @route {POST} /api/users
 */
 export default ((request, response) => {
    global.db.query("SELECT * FROM users").then((raw) => {
        if(raw.rowCount){
            return response.status(200).send(rawData[0])
        }

        return response.status(200).send("goodbye")
    })    
})