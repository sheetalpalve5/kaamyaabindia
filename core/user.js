const pool = require('./pool');
const bcrypt = require('bcrypt');
const Job = require('./job');

const job = new Job();

function User() {};

User.prototype = {
    // Find the user data by id or username.
    find : function(user = null, callback)
    {
        // if the user variable is defind
        if(user) {
            // if user = number return field = id, if user = string return field = username.
            var field = Number.isInteger(user) ? 'CANDIDATE_REGISTRATION_NUMBER' : 'USER_NAME';
        }
        // prepare the sql query
        let sql = `SELECT * FROM LND_EMPLOYEE_REGISTRATION WHERE ${field} = ?`;

console.log('User', user);
        pool.query(sql, user, function(err, result) {
            if(err) throw err

            if(result.length) {
                callback(result[0]);
            }else {
                callback(null);
            }
        });
    },

    // This function will insert data into the database. (create a new user)
    // body is an object
    create : function(body, callback)
    {

        var pwd = body.password;
        // Hash the password before insert it into the database.
        body.password = bcrypt.hashSync(pwd,10);

        // this array will contain the values of the fields.
        var bind = [];
        // loop in the attributes of the object and push the values into the bind array.
        for(prop in body){
            bind.push(body[prop]);
        }
        // prepare the sql query
        let sql = `INSERT INTO LND_EMPLOYEE_REGISTRATION(FIRST_NAME, LAST_NAME, USER_NAME, PASSWORD, EMAIL, GENDER,
        MARITAL_STATUS, LANGUAGES, EDUCATION_DEGREE, PRIMARY_SKILLS, AADHAR_NUMBER, MOBILE_NUMBER, DATE_OF_BIRTH,
        ADDRESS, CITY, STATE, ZIP_CODE, YEARS_OF_EXPERIENCE, PREFERENCE, PREFERRED_LOCATION) VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        // call the query give it the sql string and the values (bind array)
        pool.query(sql, bind, function(err, result) {
            if(err) throw err;
            // return the last inserted id. if there is no error
            console.log('user created');
            let loc= body.prefloc;
            if(!loc){
                loc=body.city;
            }
            job.userjobs(body.skills, loc, function(results) {
            if(results) {
                    callback(result.insertId, results);
            }
            else{
            callback(result.insertId, null);
            }
            });

        });
    },

    login : function(username, password, callback)
    {
        // find the user data by his username.
        this.find(username, function(user) {
            // if there is a user by this username.
//            console.log('Existing pwd:', user.password);
            if(user) {
            console.log('passed pwd:', user);
            console.log('Existing password', user.PASSWORD);
                // now we check his password.
                if(bcrypt.compareSync(password, user.PASSWORD)) {
                    let loc= user.PREFERRED_LOCATION;
                    if(!loc){
                        loc=user.CITY;
                    }
                    console.log('Skill', user.PRIMARY_SKILLS);
                    job.userjobs(user.PRIMARY_SKILLS, loc, function(results) {
                    if(results) {
                            callback(user, results);
                    }
                    else{
                        callback(user, null);
                    }
                    });
                    return;
                }
            }
            // if the username/password is wrong then return null.
            callback(null, null);
        });

    }

}

module.exports = User;