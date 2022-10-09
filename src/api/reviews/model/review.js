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
 export async function getReviewsByID(id){

    return pool.query("SELECT id, comment FROM bookSchema.Review WHERE userID = $1", [parseInt(id)]).then(rawData => {
        if(rawData.rowCount){
            return rawData.rows;
        }

        return null;
    });
}