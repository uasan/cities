'use strict';

( function () {
    const config = require('../config');
    const { Client } = require('pg')


    /******************************************
     * listCities
     * @param searchStr
     * @returns {Promise<[string]>}
     */
    const listCities = async searchStr => {

        if (searchStr.length< config.searchStrMinLength) {
            return []
        }

        const client = new Client(config.database);
        await client.connect();
        let res;

        try {
            // the 'like%' query returns more results than the 'full-text-search' query
//            res = await client.query(`SELECT DISTINCT name FROM cities WHERE to_tsvector(name) @@ to_tsquery('${searchStr}')`);
            res = await client.query(`SELECT DISTINCT name FROM cities WHERE LOWER(name) like LOWER('%${searchStr}%')`);
        } catch (e) {
            await client.end();
            return Promise.reject(e);
        }

        await client.end();

        return res.rows.map(item => item.name);
    }

    module.exports = {
        list: listCities,
    }

}) ()

