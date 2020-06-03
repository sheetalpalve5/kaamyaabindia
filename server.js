var express = require('express');
var session = require('express-session');
var mysql = require('mysql');
const path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

const pageRouter = require('./routes/pages');
const bodyParser = require('body-parser');

//var index = require('./routes/index');
//var users = require('./routes/users');

const app = express();
var PORT = process.env.PORT || 8090;

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/*+json' }))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
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

var checkUser=function(req,res,next){
  if(req.session.loggedIn){
    next();
  }else{
  var admin="admin", password="admin";
    if(req.body.username===admin && req.body.password===password){
      req.session.loggedIn=true;
      res.redirect('/');
    }else{
      res.render('login',{title:"Login Here"});
    }
//    res.render('login',{title:"Login Here"});
  }
};

var logout=function(req,res,next){
  req.session.loggedIn=false;
  res.redirect('/');
};
//app.use('/',checkUser, index);
//  Login Work Start End
//app.use('/users', users);


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
});
*/

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