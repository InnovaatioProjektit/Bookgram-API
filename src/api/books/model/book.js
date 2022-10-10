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
 * Lisää kirja kokoelmaan (joka on automaattisesti jonkun käyttäjän omistama)'
 * 
 * @param {object} kirjan id, kokoelman id
 */
 export async function addBookToCollection(data){

    const {shelf, tag} = data;

    return pool.query("INSERT INTO bookSchema.Book (tag, booktag) VALUES ($1, $2) RETURNING (id)", [tag, parseInt(shelf)]).then(rawData => {
        if(rawData.rowCount){
            return rawData.rows[0];
        }

        return null;
    });
}

/**
 * Poista kirja käyttäjän kokoelmasta
 * @param {object} (kirjan id, kokoelman id)
 */
 export async function removeBookFromCollection(data){

    const {shelf, tag} = data;

    return pool.query("DELETE FROM bookSchema.Book WHERE bookSchema.booktag = $1 AND bookSchema.Book.collectionID = $2", [tag, parseInt(shelf)]).then(rawData => {
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
        if(rawData.rowCount){
            return rawData.rows[0];
        }

        return null;
    });
}


/**
 * Hae kokoelmista kirjan tunnisteen avulla. Palauttaa kokoelmien tunnisteet joihin se kuuluu
 * 
 * @param {object} kirjan tunniste (tag)
 */
 export async function getCollectionsByUser(user){

    return pool.query("SELECT id, cname, favorited FROM bookSchema.Collection WHERE userID = $1", [user]).then(rawData => {
        if(rawData.rowCount){
            return rawData.rows;
        }

        return null;
    });
}


/**
 * Hae kokoelmista kirjan tunnisteen avulla. Palauttaa kokoelmien tunnisteet joihin se kuuluu
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
