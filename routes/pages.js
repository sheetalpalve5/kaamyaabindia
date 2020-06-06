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
router.get('/home', (req, res, next) => {
 let logg=0;
let usr=null;
let rws=[];
if(req.session.user){
    logg=req.session.loggedIn;
    usr=req.session.user.USER_NAME;
    rws=req.session.rows;
}
    res.render('index', {loggedIn:logg, usernm:usr, rows:rws});
})
router.get('/training',(req, res, next) => {
let logg=0;
let usr=null;
if(req.session.user){
    logg=req.session.loggedIn;
    usr=req.session.user.USER_NAME;
}
res.render('Trainings', {loggedIn:logg, usernm:usr});
});
router.get('/about',(req, res, next) => {
let logg=0;
let usr=null;
if(req.session.user){
    logg=req.session.loggedIn;
    usr=req.session.user.USER_NAME;
}
res.render('about', {loggedIn:logg, usernm:usr});
});
router.get('/contact',(req, res, next) => {
let logg=0;
let usr=null;
if(req.session.user){
    logg=req.session.loggedIn;
    usr=req.session.user.USER_NAME;
}
res.render('contact', {loggedIn:logg, usernm:usr});
});


router.get('/loginpage', (req, res, next) => {
res.render('login');
});

router.get('/jobpostpage', (req, res, next) => {
let logg=0;
let usr=null;
if(req.session.user){
    logg=req.session.loggedIn;
    usr=req.session.user.USER_NAME;
    }
    res.render('jobpost',{loggedIn:logg, usernm: usr});
    });

router.get('/blog', (req, res, next) => {
let logg=0;
let usr=null;
if(req.session.user){
    logg=req.session.loggedIn;
    usr=req.session.user.USER_NAME;
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
                req.session.loggedIn = 2;
                req.session.opp = 0;
                req.session.rows=result;
                res.render('index', {loggedIn:2, usernm: usr.USER_NAME,rows:result});
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
            req.session.loggedIn = 1;
            if(!result){
            result=[]
            }
            req.session.rows=result;
            // redirect the user to the home page.
//            res.setHeader('Content-Type', 'text/html');
            res.render('index', {loggedIn:req.session.loggedIn, usernm: usr.USER_NAME,rows:result});
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
   comp.create(compInput, function(results) {
            // Get the user data by it's id. and store it in a session.
            comp.find(compInput.username, function(result) {
                req.session.user = result;
                req.session.opp = 0;
                console.log('comp', result)
                res.render('index', {loggedIn:2, usernm: req.body.firstname,rows: results});
            });
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
                req.session.rows = results;
                req.session.loggedIn = 1;
                req.session.opp = 0;
                res.render('index', {loggedIn:1, usernm: req.body.firstname, rows: results});
            });
    });
});
router.get('/scraping', (req,res, next) =>{
res.render('autocomplete');
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
    job.create(jobInput, function(results) {
        console.log('first step');
            // Get the user data by it's id. and store it in a session.
            job.find(jobInput.corpname, function(result) {
                res.render('index', {loggedIn:2, usernm:req.session.user, rows:req.session.rows});
            });
    });
    });

// Get loggout page
router.get('/logout', (req, res, next) => {
    // Check if the session exist
    if(req.session.user) {
        req.session.loggedIn=0;
        req.session.user =null;
        req.session.rows=null;
        // destroy the session and redirect the user to the index page.
        req.session.destroy(function() {
            res.render('index', {loggedIn:0, usernm:null, rows:[]});
        });
    }
});

module.exports = router;
