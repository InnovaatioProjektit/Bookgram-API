import pool from '@../../utils/db';

/** 
 * Kirjaa käyttäjä ulko
 * 
 * @name users post
 * @route {POST} /api/users
 */
 export default ((request, response) => {
   
    pool.query("SELECT * FROM users").then((raw) => {
        if(raw.rowCount){
            return response.status(200).send(rawData[0])
        }

        return response.status(200).send("goodbye")
    })    
})