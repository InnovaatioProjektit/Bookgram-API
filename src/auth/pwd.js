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

export async function accessSession(user){
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET)
    const expirationLifeTime = Date.now() + process.env.TOKEN_POLICY
    const userID = user.id

    const session = await global.db.query("INSERT INTO Session (id, token, expires) VALUES ($1, $2, $3)", [userID, token, expirationLifeTime])
    return session;
}

export async function getSession(token){
    return await global.db.query("SELECT * FROM Session WHERE token = $1",
        [token]).then(rawData => {
            if(rawData.rowCount){
                return rawData.rows[0]
            }

            return null;
    })
}

export async function validateSession(token){
    try {
        const {id} = jwt.verify(token, process.env.JWT_SECRET)
        const user = await global.db.query("SELECT user FROM User WHERE id = $1", [id]).then(rawData => {
            if(rawData.rowCount){
                return  rawData.rows[0]
            }
            return null;
        });
        
        if(!user){
            throw new Error(`User token ID ${id} not found`)
        }

        const session = await global.db.query("SELECT token FROM User, Session WHERE User.id = Session.id AND User.id = $1 AND Session.token = $2 ",
        [id, token]).then(rawData => {
            if(rawData.rowCount){
                return rawData.rows[0]
            }

            return null;
        })

        if(!session){
            throw new Error(`User ${id} token ownership unverified`)
        }

        const {expires} = session

        if(expires <= Date.now()){
            await terminateSession()
            throw new Error(`User ${id} token has expired. Expiration Date:  ${expires} `)
        }

        // TODO refresh session
        // newSession and terminate SEssion

        let curSession 
        return {valid: true, curSession}
    
    }catch(err){
        return {valid: false}
    }
}

export async function terminateSession(session){
    await global.db.query("DELETE FROM Session WHERE Session.id = $1",
        [session]).then(rawData => {
            if(rawData.rowCount){
                return rawData.rows[0]
            }

            return null;
    })
}