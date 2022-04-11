import api, { setToken } from './init' 
import axios from 'axios'

/**
 * Hae kirjoja Boogle Books API:n kautta. 
 *
 */
 var options = {
    method: 'GET',
    url: 'https://www.googleapis.com/books/v1/volumes',
    params: {q: 'magic'},
    headers: {
    }
  };

export default async () => {
    return await axios.request(options).then(function (response) {
        return {data: response.data}
    }).catch(function (error) {
        console.log(error)
        return {err: error}
    });
}

/**
 * Hae (konvertoi) kirjan tiedot tagilla Google Books API:sta.
 * 
 * Sivuston kirjadata rajoittuu omistajan tunnisteen ja kirjan tagiin. Tagin avulla
 * tekemällä kutsun Google Books API:in, saamme kirjan muutkin tiedot julki.
 * 
 * @param {string} tag kirjan tunnista
 * @returns palauttaa kirjan kaikki tiedot Google Books API:sta
 */
export async function tagToBook({ tag }){
    return await axios.get(options.url + '/' + tag).then((response) => {
        return {data: response.data}
    }).catch((error) => {
        return {err: error}
    })
}



/**
 * Hae kirja käyttäjän kokoelmasta tagilla
 * @param {string} tag
 * @returns palauttaa haetun kirjan tiedot
 */
 export async function getBook({ tag }){
    return await api.get('/api/books/volume/' + tag).then(res => {
        return {data: res.data}
    }).catch(res => {
        if(res.response.status == 400 || res.response.status === 401){
            return {err: res.response.data}
        }
    })
}



/**
 * Hae käyttäjän kokoelmasta kaikki kirjat 
 * 
  * @param {string} tag
 * @returns palauttaa haetun  kokoelman kirjojen tiedot
 */
 export async function getBooks( id ){
    return await api.get('/api/books/collection/' + id).then(res => {

        return {data: res.data.rows}

    }).catch(res => {
        if(res.response.status == 400 || res.response.status === 401) {
            return {err: res.response.data}
        }
    })
}



/**
 * Lisää kirja kokoelmaan
 * @param {string} kirjan tunniste ja käyttäjän tunniste
 * @returns palauttaa haetun kirjan tiedot
 */
 export async function addBook({ user, tag }){
    return await api.post('/api/books/collection', {user, tag}).then(res => {
        return {data: res.data}
    }).catch(res => {
        if(res.response.status == 400 || res.response.status === 401){
            return {err: res.response.data}
        }
    })
}


/**
 * Poista kirja kokoelmaan
 * @param {string} kirjan tunniste ja käyttäjän tunniste
 * @returns palauttaa haetun kirjan tiedot
 */
 export async function removeBook({ user, tag }){
    return await api.delete('/api/books/collection', {data: {user, tag}}).then(res => {
        return {data: res.data}
    }).catch(res => {
        if(res.response.status == 400 || res.response.status === 401){
            return {err: res.response.data}
        }
    })
}