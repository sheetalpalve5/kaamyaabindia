const express = require('express');
const User = require('../core/user');
const Comp = require('../core/comp');
const Job = require('../core/job');
var path = require("path");
const router = express.Router();

// create an object from the class User in the file core/user.js
const user = new User();
const comp = new Comp();
const job = new Job();
// Get the index page
router.get('/', (req, res, next) => {
    let user = req.session.user;
    // If there is a session named user that means the use is logged in. so we redirect him to home page by using /home route below
    if(user) {
        res.render('index', {loggedIn:true, usernm: user.FIRST_NAME});
        return;
    }
    // IF not we just send the index page.
    res.render('index', {loggedIn:false, usernm: null});
})
router.get('/training',(req, res, next) => {
let logg=false;
let usr=null;
if(req.session.user){
    logg=true;
    usr=req.session.user.FIRST_NAME;
}
res.render('Trainings', {loggedIn:logg, usernm:usr});
});
router.get('/about',(req, res, next) => {
let logg=false;
let usr=null;
if(req.session.user){
    logg=true;
    usr=req.session.user.FIRST_NAME;
}
res.render('about', {loggedIn:logg, usernm:usr});
});
router.get('/contact',(req, res, next) => {
let logg=false;
let usr=null;
if(req.session.user){
    logg=true;
    usr=req.session.user.FIRST_NAME;
}
res.render('contact', {loggedIn:logg, usernm:usr});
});


router.get('/loginpage', (req, res, next) => {
res.render('login');
});

router.get('/jobpostpage', (req, res, next) => {
let logg=false;
let usr=null;
if(req.session.user){
    logg=true;
    usr=req.session.user.FIRST_NAME;
    }
    res.render('jobpost',{loggedIn:logg, usernm: usr});
    });

router.get('/blog', (req, res, next) => {
let logg=false;
let usr=null;
if(req.session.user){
    logg=true;
    usr=req.session.user.FIRST_NAME;
}
    res.render('blog', {loggedIn:logg, usernm:usr});
    });

router.post('/loginaction', (req, res, next) => {
    let selectedUser = req.body.member_level;
    let email=req.body.email;
     let pass=req.body.pass;
    if(!email || !pass){
    let msg='Invalid credentials. Try again';
            res.render('login', {message: msg});
            return;
    }
    if(selectedUser=='recruiter'){
    comp.login(req.body.email, req.body.pass, function(usr,result){
        if(usr) {
            // Get the user data by it's id. and store it in a session.
                req.session.user = usr;
                req.session.opp = 0;
                res.render('index', {loggedIn:true, usernm: usr.CONTACT_PERSON_FIRST_NAME,rows:result});
                next();

        }else {
        let msg='Invalid credentials. Try again';
        res.render('login', {message: msg});
        }
        });
    }
    else{
        user.login(req.body.email, req.body.pass, function(usr, result){
        console.log('jobs', result);
//        console.log('firstname', firstname);
        if(usr) {
            // Store the user data in a session.
            req.session.user = usr;
            req.session.opp = 1;
            // redirect the user to the home page.
//            res.setHeader('Content-Type', 'text/html');
            res.render('index', {loggedIn:true, usernm: usr.FIRST_NAME,rows:result});
            next();
        }else {
            // if the login function returns null send this error message back to the user.
            let msg='Invalid credentials. Try again';
            res.render('login', {message: msg});
        }
        });
    }
});

router.get('/compregister', (req, res, next) => {
res.render('compregister');
});

router.get('/empregister', (req, res, next) => {
res.render('empregister');
});

router.post('/registercomp', (req, res, next) => {
    // prepare an object containing all user inputs.
    console.log('Entered register company');
    let compInput = {
        corporatename: req.body.org_name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.your_email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        pan: req.body.orgpan,
        adh: req.body.aadhar,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city2,
        state: req.body.stt,
        zip: req.body.zip,
        ctype: req.body.optradio
    };

    // call create function. to create a new user. if there is no error this function will return it's id.
    comp.create(compInput, function(lastId, results) {
        // if the creation of the user goes well we should get an integer (id of the inserted user)
        if(lastId) {
            // Get the user data by it's id. and store it in a session.
            comp.find(lastId, function(result) {
                req.session.user = result;
                req.session.opp = 0;
                console.log('lastid', lastId);
                console.log('comp', result)
                res.render('index', {loggedIn:true, usernm: req.body.firstname,rows: results});
            });

        }else {
            console.log('An error occurred in registration ...');
        }
    });

});

// Post register data
router.post('/registeremployee', (req, res, next) => {
    // prepare an object containing all user inputs.
    console.log('Entered register employee');
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
    user.create(userInput, function(results) {
        // if the creation of the user goes well we should get an integer (id of the inserted user)
            // Get the user data by it's id. and store it in a session.
            user.findusername(userInput.username, function(result) {
                req.session.user = result;
                req.session.opp = 0;
                res.render('index', {loggedIn:true, usernm: req.body.firstname, rows: results});
            });
    });

});

router.get('/applyjob/:id', (req,res,next) => {
var id = req.params.id;     //req.query.id;
console.log('id: ', id);
//  console.log('Request Id:', req.params.id);

});

router.post('/addjob', (req, res, next) =>{
   let jobInput = {
        name: req.body.corpname,
        desc: req.body.desc,
        skills: req.body.skills,
        expr: req.body.expr,
        phone: req.body.phone,
        pref: req.body.pref,
        city: req.body.city,
        state: req.body.state,
        positions: req.body.positions,
        expiry: req.body.expiry,
        salary: req.body.salary
    };
    // call create function. to create a new user. if there is no error this function will return it's id.
    job.create(jobInput, function(lastId, results) {
        console.log('first step');
        // if the creation of the user goes well we should get an integer (id of the inserted user)
        if(lastId) {
            // Get the user data by it's id. and store it in a session.
            job.find(lastId, function(result) {
                res.render('index', {loggedIn:true, message:'job created'});
            });

        }else {
            console.log('Error creating a new user ...');
        }
    });

});

// Get loggout page
router.get('/logout', (req, res, next) => {
    // Check if the session exist
    if(req.session.user) {
        req.session.loggedIn=false;
        req.session.user =null;
        // destroy the session and redirect the user to the index page.
        req.session.destroy(function() {
            res.redirect('/');
        });
    }
});

module.exports = router;