
import {} from 'dotenv/config'
import { create } from './model/user.js'
import {hash} from '../../auth/pwd.js'
import { validationResult } from 'express-validator';
import { createCollection } from '../books/model/book.js';




/** 
 * Luo käyttäjä tulevasta pyynnöstä, pilko käyttäjän salasana bcryptilla ja tallenna
 *  tietokantaan.
 * 
 * @name register post 
 * @route {POST} /api/users/adduser
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
    
    const hashedPassword = await hash(request.body.password)

    const user = await create({
        username: request.body.username,
        password: hashedPassword,
        fullname: request.body.fullname,
        lastname: request.body.lastname
    })

    if(user){
        console.log("registered a new user: ", user)
        
        const collection = await createCollection({
            user: user.id,
            collectionName: "My Favourites"
        })

        return response.status(200).send({message: 'User was created successfully', id: user})
    }
})