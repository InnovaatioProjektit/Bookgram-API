import pool from '../../utils/db.js'
import { getSession, terminateSession } from '../../auth/pwd.js'

/** 
 * Kirjaa käyttäjä ulos palvelusta
 * 
 * @name users post
 * @route {POST} /api/users/logout
 */
 export default (async (request, response) => {
     if(request.id){
        const success = await terminateSession(request.id)
        console.log(`A user logged out: ${request.id} `)
        return response.status(200).json({rows: success, message: "OK"})
        
     }

     return response.status(401).json({message: "Invalid Token"})
})