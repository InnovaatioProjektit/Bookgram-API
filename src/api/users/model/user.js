import pool from './../../../utils/db'

/**
 * Määrittelee käyttäjän tietokannan skeeman.
 * @module userModel
 * @category Models
 */


/**
 * Luo tietokantaan käyttäjä
 * @param {object} userData käyttätiedot (tunnus, sähköposti, puhelin, salasana)
 */
export function create(userData){

    const {username, email, phone, password} = userData;

    return pool.query("INSERT INTO userSchema.User (username, email, phone, passwd) VALUES ($1, $2, $3, $4) RETURNING (id)", [username, email, phone, password]).then(rawData => {
        if(raw.rowCount){
            return rawData.rows[0];
        }

        return null;
    });
}

 
 /**
 * Hakee käyttäjän tiedot tietokannasta nimen avulla
 * 
 * @returns palauttaa yksittäisen käyttäjän tiedot (nimi, sähköposti, puhelin, käyttäjäoikeus)
 * @param {string} value käyttäjän nimi
 */
  export function findUserByName(userName){
    return pool.query("SELECT id, username, email, phone FROM userSchema.User WHERE username = $1", [String(userName)]).then(rawData => {
        
        if(rawData.rowCount){
            return rawData.rows;
        }

        return null;
    });
}

/**
 * Palauttaa käyttäjän käyttäjätunnuksen avulla
 * 
 * @param {number} userID käyttäjätunnus
 * @returns Yksittäisen käyttäjän tiedot (nimi, sähköposti, puhelinnumero, käyttäjäoikeus)
 */
 export function findUserById(userID){
    return pool.query("SELECT id, username, email, phone FROM userSchema.User WHERE id = $1", [Number(userID)]).then(rawData => {
        
        if(rawData.rowCount){
            return rawData.rows;
        }

        return null;
    });
}

/**
 * Poistaa käyttäjän tietokannasta, käyttäjätunnuksen avulla
 * 
 * @param {number} userid käyttäjätunnus
 */
 export function remove(userID){
    return pool.query("DELETE FROM userSchema.Grant WHERE usr = $1",[Number(userID)]).then(raw => {
        if(raw.rowCount){
           return pool.query("DELETE FROM userSchema.User WHERE id = $1", [Number(userID)]).then(rawData => {
                return rawData.rowCount;
            });
        }else {
            return null;
        }
    })
}

