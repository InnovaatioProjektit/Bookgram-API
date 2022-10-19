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

export default async (query) => {
    options.params.q = query;
    return await axios.request(options).then(function (response) {
        return {data: response.data}
    }).catch(function (error) {
        console.log(error)
        return {err: error}
    });
}


/**
 * Etsi kirjoja samankaltaisella nimellä
 * @param {string} query
 * @returns palauttaa haetun kirjan tiedot
 */
 export async function getVolumes(query){
    return await api.get('/api/books/volumes?q=' + query).then(res => {
        return {data: res.data}
    }).catch(res => {
        if(res.response.status == 400 || res.response.status === 401){
            return {err: res.response.data}
        }
    })
}


/**
 * Hae kirjan syvät tiedot tagilla
 * @param {string} query
 * @returns palauttaa haetun kirjan tiedot
 */
 export async function getVolume(query){
    return await api.get('/api/books/volume?q=' + query).then(res => {
        return {data: res.data}
    }).catch(res => {
        if(res.response.status == 400 || res.response.status === 401){
            return {err: res.response.data}
        }
    })
}



/**
 * Hae kirja käyttäjän kokoelmasta tagilla
 * @param {string} tag
 * @returns palauttaa haetun kirjan tiedot
 */
 export async function getBook(tag){
    return await api.get('/api/books/volume/' + tag).then(res => {
        return {data: res.data}
    }).catch(res => {
        if(res.response.status == 400 || res.response.status === 401){
            return {err: res.response.data}
        }
    })
}



/**
 * Hae kirjautuneen käyttäjän kokoelmasta kaikki kirjat 
 * 
  * @param {string} tag
 * @returns palauttaa haetun  kokoelman kirjojen tiedot
 */
 export async function getBooks( shelf ){
    return await api.get('/api/books/collections/' + shelf + '/volumes').then(res => {

        return {data: res.data.rows}

    }).catch(res => {
        if(res.response.status == 400 || res.response.status === 401) {
            return {err: res.response.data}
        }
    })
}


/**
 * Hae käyttäjän kokoelmasta kaikki kirjat 
 * 
  * @param {string} tag
 * @returns palauttaa haetun kokoelman kirjojen tiedot
 */
 export async function getBooksByUser( user, shelf ){
    return await api.get('/api/users/'+ user +'/collections/'+ shelf +'/volumes').then(res => {

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
 export async function addBook({ user, tag, shelf }){
    return await api.post('/api/books/collections/' + shelf +'/addBook', {user, tag}).then(res => {
        return {data: res.data}
    }).catch(res => {
        if(res.response.status == 400 || res.response.status === 401){
            return {err: res.response.data}
        }
    })
}


/**
 * Poista kirja kokoelmasta
 * @param {string} kirjan tunniste ja käyttäjän tunniste
 * @returns palauttaa haetun kirjan tiedot
 * TODO
 */
 export async function removeBook({ user, tag, shelf }){
    return await api.post('/api/books/collections/' + shelf +'/removeBook', {user, tag}).then(res => {
        return {data: res.data}
    }).catch(res => {
        if(res.response.status == 400 || res.response.status === 401){
            return {err: res.response.data}
        }
    })
}


/**
 * Luo uusi kokoelma käyttäjälle
 * @param {string}  käyttäjän id ja kokoelman nimi
 * @returns palauttaa OK kun luotu
 */
 export async function createCollection({ user, collectionName }){
    console.log("send", collectionName)
    return await api.post('/api/books/collections/createCollection', {user, collectionName}).then(res => {
        return {data: res.data}
    }).catch(res => {
        if(res.response.status == 400 || res.response.status === 401){
            return {err: res.response.data}
        }
    })
}


/**
 * Poista käyttäjän kokoelma
 * @param {string}  käyttäjän tunniste ja kokoelman id
 * @returns palauttaa OK kun poistettu
 */
 export async function removeCollection({ user, shelf }){
    return await api.delete('/api/books/collections/removeCollection', {data: {user, shelf}}).then(res => {
        return {data: res.data}
    }).catch(res => {
        if(res.response.status == 400 || res.response.status === 401){
            return {err: res.response.data}
        }
    })
}


/**
 * Tyhjennä käyttäjän kokoelma
 * @param {string}  käyttäjän tunniste ja kokoelman id
 * @returns palauttaa OK kun tyhjennetty
 */
 export async function clearCollection({ user, shelf }){
    return await api.post('/api/books/collections/clearCollection', {user, shelf}).then(res => {
        return {data: res.data}
    }).catch(res => {
        if(res.response.status == 400 || res.response.status === 401){
            return {err: res.response.data}
        }
    })
}


/**
 * Päivitä käyttäjän kokoelman tietoja
 * @param {string}  käyttäjän tunniste ja kokoelman id, kokoelman nimi
 * @returns palauttaa OK kun päivitetty
 */
 export async function updateCollection({ user, shelf, collectionName }){
    return await api.post('/api/books/collections/updateCollection', {user, shelf, collectionName}).then(res => {
        return {data: res.data}
    }).catch(res => {
        if(res.response.status == 400 || res.response.status === 401){
            return {err: res.response.data}
        }
    })
}


/**
 * Hae kaikki kirjautuneen käyttäjän kokoelmat
 * @param {string}  käyttäjän tunniste ja kokoelman id
 * @returns palauttaa OK kun tyhjennetty
 */
 export async function collections(){
    return await api.get('/api/books/collections').then(res => {
        return {data: res.data}
    }).catch(res => {
        if(res.response.status == 400 || res.response.status === 401){
            return {err: res.response.data}
        }
    })
}


/**
 * Hae kaikki käyttäjän kokoelmat
 * @param {string}  käyttäjän tunniste ja kokoelman id
 * @returns palauttaa OK kun tyhjennetty
 */
 export async function collectionsByID(id){
    return await api.get('/api/user/'+ id +'/collections').then(res => {
        return {data: res.data}
    }).catch(res => {
        if(res.response.status == 400 || res.response.status === 401){
            return {err: res.response.data}
        }
    })
}


/**
 * Hae kaikki kokoelmat jossa kirjan tägi
 * @param {string}  kirjan tagi
 * @returns palauttaa lista kirjoja
 */
 export async function collectionsByTag(tag){
    return await api.get('/api/books/collections/book/' + tag).then(res => {
        return {data: res.data}
    }).catch(res => {
        if(res.response.status == 400 || res.response.status === 401){
            return {err: res.response.data}
        }
    })
}

/**
 * Hae kaikki kokoelmat jossa kirjan tägi
 * @param {string}  kirjan tagi
 * @returns palauttaa lista kirjoja
 */
 export async function collectionsByTagAndUser({user, tag}){
    return await api.post('/api/books/collections/book/' + tag).then(res => {
        return {data: res.data}
    }).catch(res => {
        if(res.response.status == 400 || res.response.status === 401){
            return {err: res.response.data}
        }
    })
}




/**
 * Hae kokoelman tykkäykset
 * @param {string}  kokoelman tagi
 * @returns palauttaa tykkäysmäärä
 */
 export async function getCollectionLikes(shelf){
    return await api.get('/api/books/collections/'+ shelf +'/likes').then(res => {
        return {data: res.data}
    }).catch(res => {
        if(res.response.status == 400 || res.response.status === 401){
            return {err: res.response.data}
        }
    })
}


/**
 * lisää/poista kirjautuneen kokoelmaan tykkäys
 * @param {string}  kokoelman tagi
 * @returns palauttaa tykkäysmäärä
 */
 export async function setCollectionLikes({shelf, count}){
    return await api.post('/api/books/collections/'+ shelf +'/likes', [count]).then(res => {
        return {data: res.data}
    }).catch(res => {
        if(res.response.status == 400 || res.response.status === 401){
            return {err: res.response.data}
        }
    })
}


/**
 * lisää/poista  kokoelmaan tykkäys
 * @param {string}  kokoelman tagi
 * @returns palauttaa tykkäysmäärä
 */
 export async function setCollectionLikesByUser(user, shelf, count){
    return await api.post('/api/users/:id/collections/' + shelf +'/likes', [user, count]).then(res => {
        return {data: res.data}
    }).catch(res => {
        if(res.response.status == 400 || res.response.status === 401){
            return {err: res.response.data}
        }
    })
}


/**
 * hae kirjautuneen kokoelman kaikki tiedot
 * @param {string}  kokoelman tagi
 * @returns palauttaa tykkäysmäärä
 * TODO
 */
 export async function getCollection(shelf){
    return await api.get('/api/books/collections/' + shelf).then(res => {
        return {data: res.data}
    }).catch(res => {
        if(res.response.status == 400 || res.response.status === 401){
            return {err: res.response.data}
        }
    })
}


/**
 * hae kirjautuneen kokoelman kaikki tiedot
 * @param {string}  kokoelman tagi
 * @returns palauttaa tykkäysmäärä
 * TODO
 */
 export async function getCollectionByUser(user, shelf){
    return await api.get('/api/users/'+ user +'/collections/' + shelf).then(res => {
        return {data: res.data}
    }).catch(res => {
        if(res.response.status == 400 || res.response.status === 401){
            return {err: res.response.data}
        }
    })
}


/**
 * hae kirjautuneen tähditetyt kokoelman kirjat
 * @param {string}  kokoelman tagi
 * @returns palauttaa tykkäysmäärä
 * TODO
 */
 export async function getStarredFromCollection(shelf){
    return await api.get('/api/books/collections/'+ shelf +'/starred').then(res => {
        return {data: res.data}
    }).catch(res => {
        if(res.response.status == 400 || res.response.status === 401){
            return {err: res.response.data}
        }
    })
}


/**
 * hae käyttäjän tähditetyt kokoelman kirjat
 * @param {string}  kokoelman tagi
 * @returns palauttaa tykkäysmäärä
 * TODO
 */
 export async function getStarredFromCollectionByUser(user, shelf){
    return await api.get('/api/users/'+ user +'/collections/' + shelf +'/starred').then(res => {
        return {data: res.data}
    }).catch(res => {
        if(res.response.status == 400 || res.response.status === 401){
            return {err: res.response.data}
        }
    })
}


/**
 * hae kirjautuneen tähditetyt kokoelman kirjat
 * @param {string}  kokoelman tagi
 * @returns palauttaa tykkäysmäärä
 * TODO
 */
 export async function setBookStarred({shelf, book, starred}){
    return await api.post('/api/books/collections/'+ shelf +'/starred', {book, starred}).then(res => {
        return {data: res.data}
    }).catch(res => {
        if(res.response.status == 400 || res.response.status === 401){
            return {err: res.response.data}
        }
    })
}


/**
 * hae käyttäjän tähditetyt kokoelman kirjat
 * @param {string}  kokoelman tagi
 * @returns palauttaa tykkäysmäärä
 * TODO
 */
 export async function setBookStarredByUser({user, shelf, book, starred}){
    return await api.post('/api/users/'+ user +'/collections/'+ shelf +'/starred', {book, starred}).then(res => {
        return {data: res.data}
    }).catch(res => {
        if(res.response.status == 400 || res.response.status === 401){
            return {err: res.response.data}
        }
    })
}