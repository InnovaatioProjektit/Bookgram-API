import api, { setToken } from './init' 
import { getDecodedToken } from './token'

/**
 * Lähettää POST pyynnön /api/users/adduser nimellä ja salasanalla. 
 * @param {string} username 
 * @param {string} pwd 
 * @returns palauttaa JWT sessioavaimen.
 */
export async function register({username, password}){
    return await api.post('/api/users/adduser', {username, password}).then(res => {
        return res.data
    }).catch(res => {
        if(res.response.status == 400 || res.response.status === 401){
            return res.response.data.errors;
        }
    })
}

/**
 * Kirjautuu palvelimelle käyttäjän tiedoilla
 * @param {object} param0  käyttäjätiedot
 * @returns palauttaa kirjautumisavaimen
 */
export async function login({username, password}){
    return api.post('api/users/login', {username, password}).then(res => {
        const token = res.data.token 
        setToken(token)
        return getDecodedToken()
    }).catch(res => {
        if(res.response.status == 400 || res.response.status === 401){
            alert("There was an error with your username or password. Please try again.")
        }
    })
}

/**
 * Kirjautuu ulos
 */
export function logout(){
    setToken(null)
}