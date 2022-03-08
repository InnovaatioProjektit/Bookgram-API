
import {} from 'dotenv/config'
import { create } from './model/user.js'
import {hash} from '../../auth/pwd.js'
import { validationResult } from 'express-validator';




/** 
 * Luo käyttäjä tulevasta pyynnöstä, pilko käyttäjän salasana bcryptilla ja tallenna
 *  tietokantaan.
 * 
 * @name register post 
 * @route {POST} /api/users
 */
export default (async (request, response, next) => {
    const err = validationResult(request);
    if(!err.isEmpty()){
        return response.status(400).json({
            method: request.method,
            status: response.statusCode,
            errors: err.array()
        });
    }
    
    const hashedPassword = await hash(req.body.password)

    const user = create({
        username: req.body.username,
        password: hashedPassword,
    })

    if(user){
        return response.status(200).send({message: 'User was created successfully', id: user})
    }
})