import pool from './../../../utils/db.js'


/**
 * Määrittelee arvostelujen/kommentien tietokanta skeeman ReviewDAO
 * @module reviewModel
 * @category Reviews
 */



/**
 * Luo kirjan arvostelu. Enintään 280 kirjaimen pituinen. Saa olla vain yksi per käyttäjä per kirjan.
 * @param {object} userData tiedot (user id, book tag, comment)
 */
 export async function createReview(data){

    const {user, book, comment} = data;

    return pool.query("INSERT INTO bookSchema.Review (userID, booktag, comment) VALUES ($1, $2, $3) RETURNING (id)", [parseInt(user), book, comment]).then((rawData, err) => {

        console.log(err)

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

    return pool.query("DELETE FROM bookSchema.Review WHERE userID = $1 AND booktag = $2", [parseInt(user), book]).then(rawData => {
        return rawData.rowCount;
    });
}


/**
 * Hae kaikki kirjan arvostelut
 * @param {object} kirjan tunniste
 */
 export async function getReviewsByBook(booktag){

    return pool.query("SELECT bookSchema.Review.id, booktag, comment, fullname, lastname, userSchema.User.id as userID FROM bookSchema.Review, userSchema.user WHERE bookSchema.Review.userID = userSchema.User.id AND booktag = $1", [booktag]).then(rawData => {
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


/**
 * Hae kommentti-käyttäjä pari. (Yhdellä kirjalla saa olla vain yksi kommentti käyttäjältä)
 * @param {object} kommentin id
 */
 export async function getReviewUnique(id, tag){

    return pool.query("SELECT * FROM bookSchema.Review WHERE userID = $1 AND booktag = $2", [parseInt(id), tag]).then(rawData => {
        if(rawData.rowCount){
            return rawData.rows[0];
        }

        return null;
    });
}