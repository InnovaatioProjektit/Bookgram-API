import pool from './../../../utils/db.js'

/**
 * Määrittelee käyttäjän tietokannan skeeman.
 * @module userModel
 * @category Models
 */


/**
 * Luo tietokantaan käyttäjä
 * @param {object} userData käyttätiedot (tunnus, salasana)
 */
export async function create(userData){

    const {username, password} = userData;

    return pool.query("INSERT INTO userSchema.User (username, passwd) VALUES ($1, $2) RETURNING (id)", [username, password]).then(rawData => {
        if(rawData.rowCount){
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
  export async function findUserByName(userName){
    return pool.query("SELECT id, username FROM userSchema.User WHERE username = $1", [String(userName)]).then(rawData => {
        
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
 export async function findUserById(userID){
    return pool.query("SELECT id, username FROM userSchema.User WHERE id = $1", [Number(userID)]).then(rawData => {
        
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
 export async function remove(userID){
    return pool.query("DELETE FROM userSchema.User WHERE id = $1", [Number(userID)]).then(rawData => {
        if(rawData.rowCount){
            return rawData.rowCount;

        }
        return null;
    });
}

/**
 * Hakee käyttäjän kirjautumistiedot (salasana, luvat, jne) tietokannasta esille. Haku
 * tapahtuu joko 
 * käyttäjätunnuksella.
 * 
 * @param {object} param kirjautumisparametrit (hakutyyppi)
 * @returns palauttaa olion jossa käyttäjän kirjautumistiedot
 */
export async function auth(username){
    return pool.query("SELECT passwd as password, username, surname FROM userSchema.User WHERE UserSchema.User.username = $1", [username]).then( rawData => {
        if(rawData.rowCount){
            return rawData.rows[0];
        }
        return null;
    });
}

