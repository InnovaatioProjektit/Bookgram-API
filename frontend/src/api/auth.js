import api, { setToken } from './init' 
import { removeToken, getValidToken, getDecodedToken } from './token'

/**
 * Lähettää POST pyynnön /api/users/adduser nimellä ja salasanalla. 
 * @param {string} username 
 * @param {string} pwd 
 * @returns palauttaa JWT sessioavaimen.
 */
export async function register({username, password, fullname, lastname}){
    return await api.post('api/users/adduser', {username, password, fullname, lastname}).then(res => {
        return [true, res.data]
    }).catch(res => {
        if(res.response.status == 400 || res.response.status === 401){
            return [false, res.response.data.errors];
        }
    })
}

/**
 * Kirjautuu palvelimelle käyttäjän tiedoilla
 * @param {object} param0  käyttäjätiedot
 * @returns palauttaa kirjautumisavaimen
 */
export async function login({username, password, remember}){
    return await api.post('api/users/login', {username, password, remember}).then(res => {
        const token = res.data.token 
        setToken(token)
        
        return [true, getDecodedToken()]
    }).catch(res => {
        console.log("error", res)
        if(res.response.status == 400 || res.response.status === 401){
            return [false, "There was an error with your username or password. Please try again."]
        }
    })
}

/**
 * Kirjautuu ulos 
 * @returns palauttaa true, jos tokenin poisto onnistui
 */
export async function logout(){
    localStorage.removeItem('token') 
    return await api.post('api/users/logout').then(res => {  
        if(res.status == 200){
            return true
        }
        return false
    })
}

/**
 * Hae käyttäjän yleistiedot
 * @param {string} username 
 * @returns palauttaa array [bool, data], jossa bool on totta kun syöttö onnistuu
 */
 export async function findUser(userid){
    return await api.post('api/users/' + userid, {}).then(res => {
        return [true, res.data]
    }).catch(res => {
        if(res.response.status == 400 || res.response.status === 401){
            return [false, res.response.data.errors];
        }
    })
}