var express = require('express');
var session = require('express-session');
var mysql = require('mysql');
const path = require('path');
const pageRouter = require('./routes/pages');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
var PORT = process.env.PORT || 8090;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static('public'));

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/*+json' }))
app.set('view engine', 'jade');
//app.set('views', path.join(__dirname, 'views'));

// session
app.use(session({
    secret:'youtube_video',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 1000 * 30
    }
}));

var env = require('dotenv').config();

var connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'jobsindia'
});
connection.connect(function(err){
    if (err) throw err;
    console.log('Connected');
});

app.post('/submit', function(req,res){
var sql = "insert into LND_EMPLOYEE_REGISTRATION values(null, '"+req.body.firstname+"','"+req.body.lastname+"','"+req.body.gender+"')";
connection.query(sql, function(err){
 if (err) throw err;
 res.render('index', {title: 'Data Saved', message: 'Data saved successfully.'});
});
connection.end();
});

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