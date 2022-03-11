
import { validationResult } from 'express-validator';
import { auth } from './model/user.js'
import { validateToken } from '../../auth/pwd.js'
/** 
 * Kirjaa käyttäjä sisälle
 * 
 * @name users post
 * @route {POST} /api/users/login
 */
export default (async (request, response ) => {
    const err = validationResult(request);
        if(!err.isEmpty()){
            return response.status(400).json({
                method: request.method,
                status: response.statusCode,
                errors: err.array()
            })
        }


    const user = await auth(request.body.username)
    console.log("A user logged in: ", user)

    if(!user){
        return response.status(401).send({ message: 'Invalid username or password' })
    }else{
        const verified = await validateToken(request.body.password, user.password)

        if(verified){
            return response.status(200).send({ message: 'Login succesful' })
        }
    }

    return response.status(401).send({ message: 'Invalid username or password' })

})