import pool from '../../utils/db.js'

/** 
 * Kirjaa käyttäjä ulko
 * 
 * @name users post
 * @route {POST} /api/users
 */
 export default ((request, response) => {
    global.db.query("SELECT * FROM user").then((rawData) => {
        if(rawData.rowCount){
            return response.status(200).send("data" + rawData[0])
        }

        return response.status(400).send("goodbye")
    })    
})