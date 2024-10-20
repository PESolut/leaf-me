const dotenv = require('dotenv');
const pgp = require("pg-promise")();
dotenv.config({ path: require('path').resolve(__dirname, '../../.env') });
const { DATABASE_URL, PG_HOST, PG_PORT, PG_DATABASE, PG_USER, PG_PASSWORD } = process.env;
// https://github.com/vitaly-t/pg-promise/wiki/Connection-Syntax#configuration-object


// Deployed CN
/*
cn = {
    connectionString: DATABASE_URL,
    max: 30,
    ssl: {
        rejectUnauthorized: false,
    },
}
*/
// combined CN
console.log(PG_PASSWORD)
const cn = DATABASE_URL
	? {
			connectionString: DATABASE_URL,
			max: 30,
			ssl: {
				rejectUnauthorized: false,
			},
	  }
	: {
			host: PG_HOST,
			port: PG_PORT,
			database: PG_DATABASE,
			user: PG_USER,
			password: PG_PASSWORD
	  };

// local CN
/*

cn = {
    host: PG_HOST,
	port: PG_PORT,
	database: PG_DATABASE,
	user: PG_USER,
}
*/

// alt from express docs
// var db = pgp('postgres://username:password@host:port/database')
const db = pgp(cn);

// Add error handling
db.connect()
    .then(obj => {
        console.log('Database connection successful');
        obj.done(); // success, release the connection;
    })
    .catch(error => {
        console.error('ERROR:', error.message || error);
    });

module.exports = db;
