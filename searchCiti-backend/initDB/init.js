'use strict';

const config = require('../config');
const { Client } = require('pg')

/******************************************
 * initDb
 * @returns {Promise<void>}
 */
const initDb = async () => {

    const client = new Client(config.database);
    await client.connect();

    try {
        await client.query('DROP TABLE IF EXISTS cities');
    } catch (e) {
        console.log(e);
    }

    try {
        await client.query("CREATE TABLE cities (id integer, name varchar(64) )");
        await client.query("CREATE INDEX name ON cities USING GIN (to_tsvector('english', 'name'))");
    } catch (e) {
        console.log(e);
        return Promise.reject();
    }

    try {
        await client.query(`COPY cities FROM '${config.citiesSrc}' WITH (FORMAT csv)`);
    } catch (e) {
        console.log(e);
        return Promise.reject();
    }

    await client.end();

    console.log("Database init is completed!");
}


initDb();
