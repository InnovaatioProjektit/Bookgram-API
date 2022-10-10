import pool from './../../../utils/db.js'


/**
 * Määrittelee arvostelujen/kommentien tietokanta skeeman ReviewDAO
 * @module reviewModel
 * @category Reviews
 */



/**
 * Luo kirjan arvostelu. Enintään 280 kirjaimen pituinen.
 * @param {object} userData tiedot (user id, book tag, comment)
 */
 export async function createReview(data){

    const {user, book, comment} = data;

    return pool.query("INSERT INTO bookSchema.Review (userID, booktag, comment) VALUES ($1, $2, $3) RETURNING (id)", [parseInt(user), parseInt(book), comment]).then(rawData => {
        if(rawData.rowCount){
            return rawData.rows[0];
        }

        return null;
    });
}


/**
 * Poista kirja kokoelmasta
 * @param {object} userData tiedot (user id, book tag)
 */
 export async function deleteReview(data){

    const {user, book} = data;

    return pool.query("DELETE FROM userSchema.Review WHERE userID = $1 AND booktag = $2", [parseInt(user), parseInt(book)]).then(rawData => {
        return rawData.rowCount;
    });
}


/**
 * Hae kaikki kirjan arvostelut
 * @param {object} kirjan tunniste
 */
 export async function getReviewsByBook(booktag){

    return pool.query("SELECT id, userID, comment FROM bookSchema.Review WHERE booktag = $1", [parseInt(booktag)]).then(rawData => {
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
 export async function getReviewsByUser(id){

    return pool.query("SELECT id, booktag, comment FROM bookSchema.Review WHERE userID = $1", [parseInt(id)]).then(rawData => {
        if(rawData.rowCount){
            return rawData.rows;
        }

        return null;
    });
}


/**
 * Hae yksittäinen kommentti
 * @param {object} kommentin id
 */
 export async function getReview(id){

    return pool.query("SELECT * FROM bookSchema.Review WHERE userID = $1", [parseInt(id)]).then(rawData => {
        if(rawData.rowCount){
            return rawData.rows[0];
        }

        return null;
    });
}