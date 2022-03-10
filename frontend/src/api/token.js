import decodeJWT from 'jwt-decode'
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
    if(token){
        const header = decodeJWT(token)
        const now = Math.floor(Date.now() / 1000)
        return header && header.exp > now
    }
    return false
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
        return decodeJWT(token)
    }

    return null
}