const express = require('express');
const User = require('../core/user');
var path = require("path");
const router = express.Router();

// create an object from the class User in the file core/user.js
const user = new User();

// Get the index page
router.get('/', (req, res, next) => {
    let user = req.session.user;
    // If there is a session named user that means the use is logged in. so we redirect him to home page by using /home route below
    if(user) {
        res.render('index', {loggedIn:true, usernm: user});
        return;
    }
    // IF not we just send the index page.
    res.render('index', {loggedIn:false, usernm: null});
})

router.get('/empregister', (req, res, next) => {
res.sendFile(path.join(__dirname, "../public/empregister.html"));
//}
//res.render('/empregister.pug');
});

// Get home page
router.get('/home', (req, res, next) => {
    let user = req.session.user;

    if(user) {
        res.render('home', {opp:req.session.opp, name:user.FIRST_NAME});
        return;
    }
    res.redirect('/');
});

// Post login data
router.post('/login', (req, res, next) => {
    // The data sent from the user are stored in the req.body object.
    // call our login function and it will return the result(the user data).
    user.login(req.body.username, req.body.password, function(result) {
        if(result) {
            // Store the user data in a session.
            req.session.user = result;
            req.session.opp = 1;
            // redirect the user to the home page.
            res.redirect('/');
        }else {
            // if the login function returns null send this error message back to the user.
            res.send('Username/Password incorrect!');
        }
    })

});


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index')
});

router.get('/login', (req, res, next) => {
res.render('')
//var spawn = require("child_process").spawn;
// $.ajax({
//        type: "GET",
//        url: "../app_1.py",
//        success: callbackFunc
//    });
});

function callbackFunc(response) {
    // do something with the response
    console.log(response);
}


//    var process = spawn('python',["../app_1.py"] );
//
//    process.stdout.on('data', function(data) {
//        res.send(data.toString());
//    } );

   /* var child = exec('python ../app_1.py')
    child.stdout.on('data', function(data) {
        console.log('stdout: ' + data)
    })
    child.stderr.on('data', function(data) {
        console.log('stdout: ' + data)
    })
    child.on('close', function(code) {
        console.log('closing code: ' + code)
    }) */


// Post register data
router.post('/registeremployee', (req, res, next) => {
    // prepare an object containing all user inputs.
    let userInput = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
        email: req.body.uemail,
        gender: req.body.optradio,
        status: req.body.mstatus,
        langs: req.body.langs,
        educ: req.body.educ,
        skills: req.body.skills,
        adh: req.body.adh,
        phone: req.body.phone,
        dob: req.body.dob,
        address: req.body.address,
        city: req.body.city2,
        state: req.body.stt,
        zip: req.body.zip,
        expc: req.body.expc,
        pref: req.body.pref,
        prefloc: req.body.city1
    };
    // call create function. to create a new user. if there is no error this function will return it's id.
    user.create(userInput, function(lastId) {
        // if the creation of the user goes well we should get an integer (id of the inserted user)
        if(lastId) {
            // Get the user data by it's id. and store it in a session.
            user.find(lastId, function(result) {
                req.session.user = result;
                req.session.opp = 0;
                console.log('lastid', lastId);
                console.log('user', result)
                res.render('index', {loggedIn:true, usernm: req.body.firstname});
            });

        }else {
            console.log('Error creating a new user ...');
        }
    });

});


// Get loggout page
router.get('/logout', (req, res, next) => {
    // Check if the session is exist
    if(req.session.user) {
        req.session.loggedIn=false;
        // destroy the session and redirect the user to the index page.
        req.session.destroy(function() {
            res.redirect('/');
        });
    }
});

module.exports = router;