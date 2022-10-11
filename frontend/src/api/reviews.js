import api, { setToken } from './init' 


/**
 * Luo käyttäjältä kommentti kirjalle
 * 
 * @param {string}  kokoelman tagi
 * @returns palauttaa tykkäysmäärä
 * TODO
 */
 export async function addReview({user, book, comment}){
    return await api.post('/api/reviews/book/' + book, {user, comment}).then(res => {
        return {data: res.data}
    }).catch(res => {
        if(res.response.status == 400 || res.response.status === 401){
            return {err: res.response.data}
        }
    })
}


/**
 * Luo käyttäjältä kommentti kirjalle
 * 
 * @param {string}  kokoelman tagi
 * @returns palauttaa tykkäysmäärä
 * TODO
 */
 export async function deleteReview({user, book}){
    return await api.delete('/api/reviews/book/' + book, {user}).then(res => {
        return {data: res.data}
    }).catch(res => {
        if(res.response.status == 400 || res.response.status === 401){
            return {err: res.response.data}
        }
    })
}


/**
 * Hae kaikki käyttäjän kommentit
 * 
 * @param {string}  kokoelman tagi
 * @returns palauttaa tykkäysmäärä
 * TODO
 */
 export async function reviewsByUser(user){
    return await api.delete('/api/reviews/user/' + user).then(res => {
        return {data: res.data}
    }).catch(res => {
        if(res.response.status == 400 || res.response.status === 401){
            return {err: res.response.data}
        }
    })
}



/**
 * Hae kaikki kirjan kommentit
 * 
 * @param {string}  kokoelman tagi
 * @returns palauttaa tykkäysmäärä
 * TODO
 */
 export async function reviewsByBook(book){
    return await api.delete('/api/reviews/book/' + book).then(res => {
        return {data: res.data}
    }).catch(res => {
        if(res.response.status == 400 || res.response.status === 401){
            return {err: res.response.data}
        }
    })
}


/**
 * Hae yksittäinen kommentti
 * 
 * @param {string}  kokoelman tagi
 * @returns palauttaa tykkäysmäärä
 * TODO
 */
 export async function getReview(id){
    return await api.delete('/api/reviews/' + id).then(res => {
        return {data: res.data}
    }).catch(res => {
        if(res.response.status == 400 || res.response.status === 401){
            return {err: res.response.data}
        }
    })
}