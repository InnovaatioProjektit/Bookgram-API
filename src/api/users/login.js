
import { validationResult } from 'express-validator';
import { auth } from './model/user.js'
import { validateToken, accessSession } from '../../auth/pwd.js'
/** 
 * Kirjaa käyttäjä sisään
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
    const rememberMe = request.body.remember || false;

    if(user){
        const verified = await validateToken(request.body.password, user.password)

        if(verified){
            console.log("A user logged in: ", user.id, user.username, "rememberMe:", rememberMe)
            return response.status(200).send({token: await accessSession(user, rememberMe), message: 'Login successful' })
        }
    }

    return response.status(401).send({ message: 'Invalid username or password' })
})