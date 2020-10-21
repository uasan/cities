( function () {

    const path = require('path');

    module.exports = {
        "port": process.env.PORT || 3001,

        "database": {
            user: 'testuser',
            host: 'localhost',
            database: 'cities',
            password: 'testpassword',
            port: 5432,
        },

        "searchStrMinLength": 3,

        "citiesSrc": "/usr/src/cities.csv",
    };
}) ()