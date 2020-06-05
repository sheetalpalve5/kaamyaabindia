var express = require('express');
var session = require('express-session');
const path = require('path');
const pageRouter = require('./routes/pages');
const bodyParser = require('body-parser');

//var index = require('./routes/index');
//var users = require('./routes/users');

const app = express();
var PORT = process.env.PORT || 8090;

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/*+json' }))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// session
app.use(session({
    secret:'app',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 1000 * 30
    }
}));

//var ibmdb = require('ibm_db');
//
//ibmdb.open("DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-lon02-02.services.eu-gb.bluemix.net;UID=qzm21635;PWD=92wzcpxxdmz9cw+c;PORT=50000;PROTOCOL=TCPIP", function (err,conn) {
//  if (err) return console.log(err);
//  conn.query('select 1 from sysibm.sysdummy1', function (err, data) {
//    if (err) console.log(err);
//    else console.log(data);
//    conn.close(function () {
//      console.log('done');
//    });
//  });
//});
var env = require('dotenv').config();

//const cn = "DSN=usrProd;UID=username1;PWD=password1";
//
//odbc.connect(cn, (error, connection) => {
//  connection.query(
//    "SELECT * FROM jobsindia.LND_EMPLOYEE_REGISTRATION FETCH FIRST 2 ROWS ONLY",
//    (error, result) => {
//      if (error) {
//        throw error;
//      }
//      console.log(result);
//    }
//  );
//});

/*var connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'jobsindia'
});
connection.connect(function(err){
    if (err) throw err;
    console.log('Connected');
});*/

// Routers
app.use('/', pageRouter);

// Errors => page not found 404
app.use((req, res, next) =>  {
    var err = new Error('Page not found');
    err.status = 404;
    next(err);
})

// Handling errors (send them to the client)
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
});

// Setting up the server
app.listen(PORT, function() {
  console.log('Your app is listening on PORT ' + PORT);
})

module.exports = app;