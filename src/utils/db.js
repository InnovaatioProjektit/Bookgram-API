import {} from 'dotenv/config'
import pkg from 'pg';
const { Client, Pool } = pkg;


/**
 * Määrittelee ja hallitsee postgreSQL tietokantaa ja sen yhteyttä
 * 
 * @module db
 * @category Database
 */
const pool = new Pool();

console.log("new DB pool created");

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

pool.connect();

export default pool;
