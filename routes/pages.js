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
            console.log('Jobs: ', result);
                req.session.user = usr;
                req.session.loggedIn = 2;
                req.session.opp = 0;
                req.session.rows=result;
                res.render('index1', {loggedIn:2, usernm: usr.USER_NAME,rows:result});
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
        corporatename: req.body.org_name.trim(),
        username: req.body.username.trim(),
        password: req.body.password.trim(),
        email: req.body.your_email.trim(),
        firstname: req.body.firstname.trim(),
        lastname: req.body.lastname.trim(),
        pan: req.body.orgpan.trim(),
        adh: req.body.aadhar.trim(),
        phone: req.body.phone.trim(),
        address: req.body.address.trim(),
        city: req.body.city2.trim(),
        state: req.body.stt.trim(),
        zip: req.body.zip.trim(),
        ctype: req.body.optradio.trim()
    };

    // call create function. to create a new user. if there is no error this function will return it's id.
    comp.create(compInput, function(lastId, results) {
        // if the creation of the user goes well we should get an integer (id of the inserted user)
        if(lastId) {
            // Get the user data by it's id. and store it in a session.
            comp.find(lastId, function(result) {
                req.session.user = result;
                req.session.loggedIn = 2
                req.session.opp = 0;
                console.log('lastid', lastId);
                console.log('comp', result)
                res.render('index1', {loggedIn:req.session.loggedIn, usernm: req.body.username,rows: results});
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
        firstname: req.body.firstname.trim(),
        lastname: req.body.lastname.trim(),
        username: req.body.username.trim(),
        password: req.body.password.trim(),
        email: req.body.uemail.trim(),
        gender: req.body.optradio.trim(),
        status: req.body.mstatus.trim(),
        langs: req.body.langs.trim(),
        educ: req.body.educ.trim(),
        skills: req.body.skills.trim(),
        adh: req.body.adh.trim(),
        phone: req.body.phone.trim(),
        dob: req.body.dob.trim(),
        address: req.body.address.trim(),
        city: req.body.city2.trim(),
        state: req.body.stt.trim(),
        zip: req.body.zip.trim(),
        expc: req.body.expc.trim(),
        pref: req.body.pref.trim(),
        prefloc: req.body.city1.trim()
    };
    // call create function. to create a new user. if there is no error this function will return it's id.
    user.create(userInput, function(lastId, results) {
        // if the creation of the user goes well we should get an integer (id of the inserted user)
        if(lastId) {
            // Get the user data by it's id. and store it in a session.
            user.find(lastId, function(result) {
                req.session.user = result;
                req.session.loggedIn = 1;
                req.session.opp = 0;
                if(!results){
                results = [];
                }
                req.session.rows=results;
                res.render('index', {loggedIn:req.session.loggedIn, usernm: req.body.username, rows: results});
            });

        }else {
            console.log('Error creating a new user ...');
        }
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
        name: req.body.corpname.trim(),
        desc: req.body.desc.trim(),
        skills: req.body.skills.trim(),
        expr: req.body.expr.trim(),
        phone: req.body.phone.trim(),
        pref: req.body.pref.trim(),
        city: req.body.city.trim(),
        state: req.body.state.trim(),
        positions: req.body.positions.trim(),
        expiry: req.body.expiry.trim(),
        salary: req.body.salary.trim(),
        comp_reg_key: req.session.user.COMPANY_REGISTRATION_NUMBER
    };
    // call create function. to create a new user. if there is no error this function will return it's id.
    job.create(jobInput, function(lastId, results) {
        console.log('first step');
        let rws=[];
        // if the creation of the user goes well we should get an integer (id of the inserted user)
        if(lastId) {
            if(req.session.rows){
            rws=req.session.rows;
            }
            // Get the user data by it's id. and store it in a session.
            job.find(lastId, function(result) {
                res.render('index', {loggedIn:2, usernm:req.session.user.USER_NAME,rows:rws});
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