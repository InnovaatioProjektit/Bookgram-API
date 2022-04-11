import pool from './../../../utils/db.js'

/**
 * Määrittelee kirjojen tietokanta skeeman BookDAO
 * @module bookModel
 * @category Models
 */

/**
 * Luo uusi kirjakokoelma
 * @param {object} userData käyttätiedot (id, kokoelman nimi)
 */
 export async function createCollection(data){
    const {userID, collectionName} = data;

    return pool.query("INSERT INTO bookSchema.Collection (userID, cname) VALUES ($1, $2) RETURNING (id)", [userID, collectionName]).then(rawData => {
        if(rawData.rowCount){
            return rawData.rows[0];
        }

        return null;
    });
}



/**
 * Lisää kirja kokoelmaan
 * @param {object} userData käyttätiedot (id, kokoelman nimi)
 */
 export async function createBook(data){

    const {user, tag} = data;

    return pool.query("INSERT INTO bookSchema.Book (tag, userID) VALUES ($1, $2) RETURNING (id)", [tag, parseInt(user)]).then(rawData => {
        if(rawData.rowCount){
            return rawData.rows[0];
        }

        return null;
    });
}

/**
 * Poista kirja käyttäjän kokoelmasta
 * @param {object} userData käyttätiedot (id, kokoelman nimi)
 */
 export async function removeBook(data){

    const {user, tag} = data;

    return pool.query("DELETE FROM bookSchema.Book WHERE bookSchema.Book.tag = $1 AND bookSchema.Book.userID = $2", [tag, parseInt(user)]).then(rawData => {
        return rawData.rowCount
    });
}


/**
 * Luo kirjan arvostelu
 * @param {object} userData käyttätiedot (user, book, score)
 */
 export async function createReview(data){

    const {user, book, score} = data;

    return pool.query("INSERT INTO bookSchema.Review (userID, bookID, score) VALUES ($1, $2, $3) RETURNING (id)", [parseInt(user), parseInt(book), parseInt(score)]).then(rawData => {
        if(rawData.rowCount){
            return rawData.rows[0];
        }

        return null;
    });
}


/**
 * Hae kirja tägillä
 * 
 * @param {object} kirjan tunniste (tag)
 */
 export async function getBook(data){

    const { tag } = data;

    return pool.query("SELECT * FROM bookSchema.Book WHERE bookSchema.Book.tag = $1", [tag]).then(rawData => {
        if(rawData.rowCount){
            return rawData.rows[0];
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
 * Hae kokoelma kaikki kirjat
 * @param {object} kokoelman id
 */
 export async function getBooksByCollection(id){

    return pool.query("SELECT * FROM bookSchema.Book WHERE userID = $1", [parseInt(id)]).then(rawData => {
        if(rawData.rowCount){
            return rawData.rows;
        }

        return null;
    });
}

/**
 * Hae käyttäjän kaikki arvostelut
 * @param {object} käyttäjän id
 */
 export async function getReviewsByID(id){

    return pool.query("SELECT * FROM bookSchema.Review WHERE userID = $1", [parseInt(id)]).then(rawData => {
        if(rawData.rowCount){
            return rawData.rows[0];
        }

        return null;
    });
}