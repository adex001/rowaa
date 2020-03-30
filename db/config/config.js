require('dotenv').config();
const path = require('path');
const dialect = 'postgres';
module.exports = {
    development: {
        dialect,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        logging: (e) => console.log(e)
    },
    test: {
        dialect: 'sqlite',
        storage: path.join(__dirname, '..', 'db.sqlite3'),
        logging: false
    },
    production: {
        dialect,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        logging: false,
    },
};
