import { Client, Pool } from 'pg';

/**
 * Määrittelee ja hallitsee postgreSQL tietokantaa ja sen yhteyttä
 * 
 * @module db
 * @category Controllers
 */

const pool = new Pool();

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

pool.connect();

export default pool;
