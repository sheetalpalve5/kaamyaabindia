const pool = require('./pool');
const bcrypt = require('bcrypt');


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
            loggedIn = true;
            usnm = body.username;
            callback(result.insertId);

        });
    },

    login : function(username, password, callback)
    {
        // find the user data by his username.
        this.find(username, function(user) {
            // if there is a user by this username.
            if(user) {
                // now we check his password.
                if(bcrypt.compareSync(password, user.password)) {
                    // return his data.
                    callback(user);
                    return;
                }
            }
            // if the username/password is wrong then return null.
            callback(null);
        });

    }

}

module.exports = User;