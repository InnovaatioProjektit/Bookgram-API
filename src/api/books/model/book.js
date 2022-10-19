import pool from './../../../utils/db.js'

/**
 * Määrittelee kirjojen tietokanta skeeman BookDAO
 * @module bookModel
 * @category Models
 */

/**
 * Luo uusi kirjakokoelma käyttäjälle
 * @param {object} userData käyttäjätiedot (id, kokoelman nimi)
 */
 export async function createCollection(data){
    const {user, collectionName} = data;

    return pool.query("INSERT INTO bookSchema.Collection (userID, cname) VALUES ($1, $2) RETURNING (id)", [parseInt(user), collectionName]).then(rawData => {
        if(rawData.rowCount){
            return rawData.rows[0];
        }

        return null;
    });
}

/**
 * Luo uusi kirjakokoelma käyttäjälle
 * @param {object} userData käyttäjätiedot (id, kokoelman nimi)
 */
 export async function removeCollection(data){
    const {user, shelf} = data;

    return pool.query("DELETE FROM bookSchema.Collection WHERE userID = $1 AND id = $2", [parseInt(user), parseInt(shelf)]).then(rawData => {
        return rawData.rows;
    });
}


/**
 * Luo uusi kirjakokoelma käyttäjälle
 * @param {object} userData käyttäjätiedot (id, kokoelman nimi)
 */
 export async function clearCollection(data){
    const {user, shelf} = data;

    return pool.query("DELETE FROM bookSchema.Book WHERE collectionID = $1", [parseInt(shelf)]).then(rawData => {
        return rawData.rows;
    });
}

/**
 * Päivitä kokoelman tykkäykset määrällä
 * @param {object} kokoelman tunniste, uusi nimi
 */
 export async function updateCollection(data){
    const {user, shelf, collectionName} = data;

    return pool.query("UPDATE bookSchema.Collection SET cname = $1 WHERE id = $2", [collectionName, parseInt(shelf)]).then(rawData => {
        return rawData.rowCount
    });
}



/**
 * Lisää kirja kokoelmaan (joka on automaattisesti jonkun käyttäjän omistama)'
 * 
 * @param {object} kirjan id, kokoelman id
 */
 export async function addBookToCollection(data){

    const {shelf, tag} = data;

    return pool.query("INSERT INTO bookSchema.Book (collectionID, booktag) VALUES ($1, $2)", [parseInt(shelf), tag]).then(rawData => {
        return rawData.rowCount
    });
}

/**
 * Poista kirja käyttäjän kokoelmasta
 * @param {object} (kirjan id, kokoelman id)
 */
 export async function removeBookFromCollection(data){

    const {shelf, tag} = data;

    return pool.query("DELETE FROM bookSchema.Book WHERE booktag = $1 AND collectionID = $2", [tag, parseInt(shelf)]).then(rawData => {
        return rawData.rowCount
    });
}



/**
 * hae kokoelman like-määrät
 * @param {object} kokoelman tunniste
 */
 export async function getCollectionFavourited(collectionID){

    return pool.query("SELECT favourited FROM bookSchema.Collection WHERE id = $1", [parseInt(collectionID)]).then(rawData => {
        if(rawData.rowCount){
            return rawData.rows[0];
        }

        return null;
    });
}

/**
 * Päivitä kokoelman tykkäykset määrällä
 * @param {object} kokoelman tunniste
 */
 export async function updateCollectionFavourited(collectionID, count){

    return pool.query("UPDATE bookSchema.Collection SET favourited = favourited + $1 WHERE id = $2", [parseInt(count), parseInt(collectionID)]).then(rawData => {
        return rawData.rowCount
    });
}


/**
 * Päivitä kirjan tykkäykset  määrällä
 * @param {object} kokoelman tunniste, boolean
 */
 export async function updateBookStarred(collectionID, booktag, starred){

    return pool.query("UPDATE bookSchema.Book SET starred = $1 WHERE collectionID = $2 AND booktag = $2", [starred, parseInt(collectionID), booktag]).then(rawData => {
        return rawData.rowCount
    });
}


/**
 * Hae kokoelmat käyttäjän tunnisteen avulla. Palauttaa niiden kokoelmien tiedot jotka kuuluvat käyttäjälle
 * 
 * @param {object} käyttäjän tunniste
 */
 export async function getCollectionsByUser(user){

    return pool.query("SELECT id, cname, favourited FROM bookSchema.Collection WHERE userID = $1", [user]).then(rawData => {
        if(rawData.rowCount){
            return rawData.rows;
        }

        return null;
    });
}


/**
 * Hae kokoelmat joihin kirja kuuluu
 * 
 * @param {object} kirjan tunniste (tag)
 */
 export async function getCollectionsByBook(tag){

    return pool.query("SELECT starred, collectionID FROM bookSchema.Book WHERE bookSchema.Book.booktag = $1", [tag]).then(rawData => {
        if(rawData.rowCount){
            return rawData.rows;
        }

        return null;
    });
}

/**
 * Hae kaikki käyttäjän kokoelmat joihin kirja kuuluu
 * 
 * @param {object} käyttäjän tunniste (user) ja kirjan tunniste (tag)
 */
 export async function getCollectionsByBookAndUser(user, tag){

    return pool.query("SELECT id, cname FROM bookSchema.Collection INNER JOIN bookSchema.Book ON id = collectionID WHERE userID = $1 AND booktag = $2", [parseInt(user), tag]).then(rawData => {
        
        if(rawData.rowCount){
            return rawData.rows;
        }

        return null;
    });
}

/**
 * Hae kokoelma id:llä
 * @param {object} kokoelman id
 */
 export async function getCollectionByID(id){

    return pool.query("SELECT * FROM bookSchema.Collection WHERE id = $1", [parseInt(id)]).then(rawData => {
        if(rawData.rowCount){
            return rawData.rows[0];
        }

        return null;
    });
}


/**
 * Hae kokoelma käyttäjän id:llä
 * @param {object} käyttäjän id, kokoelman id
 */
 export async function getCollectionByUser(userID, id){

    return pool.query("SELECT * FROM bookSchema.Collection WHERE id = $1 and userID = $2", [parseInt(id), parseInt(userID)]).then(rawData => {
        if(rawData.rowCount){
            return rawData.rows[0];
        }

        return null;
    });
}


/**
 * Hae käyttäjän kokoelmista kokoelman tiedot nimellä, palauttaa 1 jos löytyy
 * @param {object} käyttäjän id, kokoelman id
 */
 export async function getCollectionByName(user, name){

    return pool.query("SELECT id FROM bookSchema.Collection WHERE userID = $1 AND cname = $2", [parseInt(user), name]).then(rawData => {
        if(rawData.rowCount){
            return rawData.rows[0]
        }

        return null;
    });
}

/**
 * Hae kokoelman kaikki kirjat. Palauttaa kirjojen tunnisteet
 * @param {object} kokoelman id
 */
 export async function getBooksByCollection(collectionID){

    return pool.query("SELECT booktag, starred FROM bookSchema.Book WHERE collectionID = $1", [parseInt(collectionID)]).then(rawData => {
        if(rawData.rowCount){
            return rawData.rows;
        }

        return null;
    });
}

/**
 * Hae kokoelman kaikki kirjat. Palauttaa kirjojen tunnisteet
 * @param {object} kokoelman id
 */
 export async function getBook(booktag){
    return pool.query("SELECT collectionID, starred FROM bookSchema.Book WHERE booktag = $1", [booktag]).then(rawData => {
        if(rawData.rowCount){
            return rawData.rows[0];
        }

        return null;
    });
}
