import pool from '../../utils/db.js'




/** 
 * Luo käyttäjä tulevasta pyynnöstä, pilko käyttäjän salasana bcryptilla ja tallenna
 *  tietokantaan.
 * 
 * @name register post 
 * @route {POST} /api/users
 */
export default ((request, response) => {


    const {username, email, phone, password} = userData;

    return pool.query("INSERT INTO userSchema.User (username, email, phone, passwd) VALUES ($1, $2, $3, $4) RETURNING (id)", [username, email, phone, password]).then(rawData => {
        return pool.query("INSERT INTO userSchema.Grant (usr, addAction, readAction, deleteAction, lvl) VALUES ($1, false, true, false, 1)", [rawData.rows[0].id]).then(raw => {
            if(raw.rowCount){
                return rawData.rows[0];
            }

            return null;
        });
});


    return response.status(200).send("goodbye")
})