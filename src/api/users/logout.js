import pool from '../../utils/db.js'

/** 
 * Kirjaa käyttäjä ulko
 * 
 * @name users post
 * @route {POST} /api/users
 */
 export default ((request, response) => {
    pool.query("SELECT * FROM user").then((rawData) => {
        if(rawData.rowCount){
            return response.status(200).send(rawData[0])
        }

        return response.status(200).send("goodbye")
    })    
})