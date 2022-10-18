import {} from 'dotenv/config'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function hash(password){
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT))
    return await bcrypt.hash(password, salt)
}

export async function validateToken(hash, hashb){
    return await bcrypt.compare(hash, hashb);
}

/**
 * Luo Session JWT-token käyttäjälle, jolla voi pysyä kirjautuneena 1h verran.
 * Kun rememberMe=true, sessio kestää max. 3 kuukautta
 * 
 * @param {*} user id
 * @param {*} rememberMe boolean
 * @returns session token
 */
export async function accessSession(user, rememberMe){
    const expirationLifeTime = Date.now() + ((rememberMe ? 8640000 : parseInt(process.env.TOKEN_POLICY)) * 1000)
    const expires = rememberMe ? {"expiresIn": 8640000} : {"expiresIn": "1h"}
    const token = jwt.sign({id: user.id, user: user.username}, process.env.JWT_SECRET, expires)
    const userID = user.id

    const session = await global.db.query("INSERT INTO userSchema.Session (id, token, expires) VALUES ($1, $2, $3)", [userID, token, expirationLifeTime])
    return token;
}

export async function getSession(token){
    return await global.db.query("SELECT * FROM userSchema.Session WHERE token = $1",
        [token]).then(rawData => {
            if(rawData.rowCount){
                return rawData.rows[0]
            }

            return null;
    })
}



/**
 * Validoi, että käyttäjän avain on olemassa, se on tuore ja käyttäjänsä omistama JWT token.
 * 
 * @param {string} token avain jota validoitaan
 * @param {boolean} refresh päivitetäänkö sessio
 * @returns valid:true, jos validi avain. Palauttaa tuore token, jos refresh on true
 */
export async function validateSession(token, refresh){
    try {
        const {err, id, user} = jwt.verify(token, process.env.JWT_SECRET)
        const db_user = await global.db.query("SELECT username FROM userSchema.User WHERE id = $1", [id]).then(rawData => {
            if(rawData.rowCount){
                return rawData.rows[0]
            }
            return null;
        });

        if(err || !user || db_user.username != user){
            throw new Error(`verification of usertoken ${id} failed`)
        }

        const session = await global.db.query("SELECT token, expires FROM userSchema.User, userSchema.Session WHERE userSchema.User.id = userSchema.Session.id AND UserSchema.User.id = $1 AND userSchema.Session.token = $2",
        [parseInt(id), token]).then(rawData => {
            if(rawData.rowCount){
                return rawData.rows[0]
            }

            return null;
        })

        if(!session){
            throw new Error(`User token ownership unverified`)
        }

        const {expires} = session

        if(expires <= Date.now()){
            await terminateSession(token)
            throw new Error(`User token has expired. Expiration Date:  ${expires} `)
        }

        let curSession
        if(refresh){
            curSession = await accessSession(user)
            await terminateSession(token)
        }

        return {valid: true, id: id, curSession}
    
    }catch(err){
        return {valid: false, message: err.toString()}
    }
}

/**
 * Authenticate JWT token as belonging to the user
 *
 */
export async function authentication(request, response, next){
    const header = request.header('authorization')
    const token = header && header.split(' ')[1]
    if(token == null){
        //return response.redirect('/api/users/login')
        return response.status(403).send("login required")
    }

    const {message, valid, id} = await validateSession(token)
    if(!valid){
        return response.status(403).send(message)
    }
    request.id = id
    next()
}

export async function terminateSession(sessionID){
    await global.db.query("DELETE FROM userSchema.Session WHERE userSchema.Session.id = $1",
        [sessionID]).then(rawData => {
            return rawData.rowCount
    })
}