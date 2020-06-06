const pool = require('./pool');
const bcrypt = require('bcrypt');
const Job = require('./job');

const job = new Job();

function Comp() {};

Comp.prototype = {
    // Find the comp data by id or username.
    find : function(comp = null, callback)
    {
        // if the comp variable is defind
        if(comp) {
            // if comp = number return field = id, if comp = string return field = username.
            var field = Number.isInteger(comp) ? 'COMPANY_REGISTRATION_NUMBER' : 'USER_NAME';
        }
        // prepare the sql query
        let sql = `SELECT * FROM LND_COMPANY_REGISTRATION WHERE ${field} = ?`;

//console.log('Comp', comp);
        pool.query(sql, comp, function(err, result) {
            if(err) throw err

            if(result.length) {
                callback(result[0]);
            }else {
                callback(null);
            }
        });
    },

    // This function will insert data into the database. (create a new comp)
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
        let sql = `INSERT INTO LND_COMPANY_REGISTRATION(CORPORATE_NAME, USER_NAME, PASSWORD, EMAIL,
        CONTACT_PERSON_FIRST_NAME, CONTACT_PERSON_LAST_NAME, COMPANY_PAN_CARD, COMPANY_AADHAR_NUMBER, CONTACT_NUMBER,
        ADDRESS, CITY, STATE, ZIP_CODE, COMPANY_TYPE) VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        // call the query give it the sql string and the values (bind array)
        pool.query(sql, bind, function(err, result) {
            if(err) throw err;
            // return the last inserted id. if there is no error
            console.log('Your Registration is Complete!');
            job.compjobs(body.COMPANY_REGISTRATION_NUMBER, function(results) {
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
        // find the comp data by his username.
        this.find(username, function(comp) {
            // if there is a comp by this username.
            if(comp) {
                // now we check his password.
                if(bcrypt.compareSync(password, comp.PASSWORD)) {
                    // return his data.
                    job.compjobs(comp.COMPANY_REGISTRATION_NUMBER, function(results) {
                    if(results) {
                            callback(comp, results);
                    }
                    else{
                        callback(comp, null);
                    }
                    });
                    return;
                }
            }
            // if the username/password is wrong then return null.
            callback(null);
        });

    }

}

module.exports = Comp;