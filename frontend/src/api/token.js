import decodeJWT from 'jwt-decode'
/**
 * Tallenna käyttäjän autentikointidata selaimelle
 */
const key = 'token'


/**
 * Lisää käyttäjän avain lcoalStorageen
 * 
 * @param {string} token 
 */
export function storeToken(token){
    if(token){
        localStorage.setItem(key, token)
    }
}

/**
 * Validoi, että avain on tuore
 * @param {string} token 
 * @returns totta, jos avain on aito ja tuore
 */
export function validateToken(token){
    if(token){
        const header = decodeJWT(token)
        const now = Math.floor(Date.now() / 1000)
        return header && header.exp > now
    }
    return false
}

/**
 * Validoi avain
 * 
 * @returns palauttaa avaimen jos se on tuore
 */
export function getValidToken(){
    const token = localStorage.getItem(key)
    if(validateToken(token)){
        return token
    }
    
    return null
}


/**
 * dekoodaa avain
 * @returns dekoodattu JSON avaimesta
 */
export function getDecodedToken(){
    const token = getValidToken()
    if(token){
        return decodeJWT(token)
    }

    return null
}
