import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export function hash(password){
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT))
    return await bcrypt.hash(password, salt)
}

export function validateToken(hash, hashb){
    return await bcrypt.compare(hash, hashb);
}

export async function accessSession(user){
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET)
}

export function validateSession(token){
    try {
        const id = jwt.verify(token, process.env.JWT_SECRET)
       
    }
}

export function terminateSession(session){

}