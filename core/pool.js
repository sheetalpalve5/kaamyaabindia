const util = require('util');
const mysql = require('mysql');

/**
 * Connection to the database.
 *  */
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root', // use your mysql username.
    password: '', // user your mysql password.
    database: 'jobsindia'
});

//const cn = "DSN=usrProd;UID=username1;PWD=password1";
//var odbcPool = require("ibm_db").Pool
//    , pool = new Pool()
//    , cn = "DATABASE=jobsindia;HOSTNAME=localhost;PORT=port;PROTOCOL=TCPIP;UID=username1;PWD=password1";
//
//pool.open(cn, function (err, db) {
//    if (err) {
//        return console.log(err);
//    }
//
//    //db is now an open database connection and can be used like normal
//    //if we run some queries with db.query(...) and then call db.close();
//    //a connection to `cn` will be re-opened silently behind the scense
//    //and will be ready the next time we do `pool.open(cn)`
//});

pool.getConnection((err, connection) => {
    if(err)
        console.error("Something went wrong connecting to the database ...");

    if(connection)
        connection.release();
    return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;