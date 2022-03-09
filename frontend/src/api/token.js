import jwt from 'jsonwebtoken'
/**
 * Tallenna käyttäjän autentikointidata selaimelle
 */
const key = 'token'

export function storeToken(token){
    if(token){
        localStorage(key, token)
    }
}

export function validateToken(token){
    const header = jwt.decode(token)
    const now = Math.floor(Date.now() / 1000)
    return header && header.exp > now
}

export function getValidToken(){
    const token = localStorage.getItem(key)
    if(validateToken(token)){
        return token
    }
    return null
}

export function getDecodedToken(){
    const token = getValidToken()
    if(token){
        return jwt.decode(token)
    }

    return null
}

export function getDecodedToken(){
    if( isValidToken()){
        return 0
    }
    return null;
}