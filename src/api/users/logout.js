import pool from '../../utils/db.js'
import { getSession, terminateSession } from '../../auth/pwd.js'

/** 
 * Kirjaa käyttäjä ulos palvelusta
 * 
 * @name users post
 * @route {POST} /api/users/logout/:id
 */
 export default (async (request, response) => {
     const session = getSession(request.params.id)
     terminateSession(session.id)

     if(session){
        const success = await terminateSession(session.id)
        return response.status(200).json({rows: success, message: "You have logged out"})
     }

     return response.status(400).json({message: "Unknown token was given"})
})