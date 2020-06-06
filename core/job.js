const pool = require('./pool');
const bcrypt = require('bcrypt');


function Job() {};

Job.prototype = {
    // Find the user data by id or username.
    find : function(job = null, callback)
    {
        // if the user variable is defind
        if(job) {
            // if user = number return field = id, if user = string return field = username.
            var field = Number.isInteger(job) ? 'JOB_ID' : null;
        }
        // prepare the sql query
        let sql = `SELECT * FROM LND_JOB_POSTINGS WHERE ${field} = ?`;

        pool.query(sql, job, function(err, result) {
            if(err) throw err

            if(result && result.length) {
                callback(result[0]);
            }else {
                callback(null);
            }
        });
    },
    compjobs: function(comp_key = null, callback)
        {
        let sql = '';
        var bind = [];
        if(comp_key) {
          sql = `SELECT * FROM LND_JOB_POSTINGS WHERE COMPANY_REGISTRATION_NUMBER = ? order by CREATE_TS desc limit 10`;
          bind.push(comp_key);
          }
          else{
          sql = `SELECT * FROM LND_JOB_POSTINGS order by CREATE_TS desc limit 10`;
          }

        console.log('bind value', bind);
        pool.query(sql, bind, function(err, rows) {
            if(err) throw err
        let jobList=[];
            if(!rows && rows.length==0){
                callback(null);
            }
            else{
           for (var i = 0; i < rows.length; i++) {

	  			// Create an object to save current row's data
		  		var job = {
		  			'jobid':rows[i].JOB_ID,
		  			'compname':rows[i].CORPORATE_NAME,
		  			'desc':rows[i].JOB_DESCRIPTION,
		  			'state':rows[i].JOB_LOCATION_STATE,
		  			'city': rows[i].JOB_LOCATION_CITY,
		  			'pref': rows[i].PREFERENCE
		  		}
		  		// Add object into array
		  		jobList.push(job);
		  		}

                callback(jobList);
            }
        });
    },
    userjobs: function(skill = null, loc=null, callback)
    {
        let sql = '';
        var bind = [];
        if(skill) {
        if(loc){
           sql = `SELECT * FROM LND_JOB_POSTINGS WHERE REQUIRED_SKILLS = ? and JOB_LOCATION_CITY = ? order by CREATE_TS desc limit 10`;
           bind.push(skill.trim());
           bind.push(loc.trim());
           }
           else{
           sql = `SELECT * FROM LND_JOB_POSTINGS WHERE REQUIRED_SKILLS = ? order by CREATE_TS desc limit 10`;
           bind.push(skill.trim());
           }
        }
        else if(loc){
        sql = `SELECT * FROM LND_JOB_POSTINGS WHERE JOB_LOCATION_CITY = ? order by CREATE_TS desc limit 10`;
        bind.push(loc.trim());
        }
        else{
        sql = `SELECT * FROM LND_JOB_POSTINGS order by CREATE_TS desc limit 10`;
        }
        console.log('bind value2', bind);
        pool.query(sql, bind, function(err, rows) {
            if(err) throw err
        let jobList=[];
            if(!rows && rows.length==0){
                callback(null);
            }
            else{
           for (var i = 0; i < rows.length; i++) {

	  			// Create an object to save current row's data
		  		var job = {
		  			'jobid':rows[i].JOB_ID,
		  			'compname':rows[i].CORPORATE_NAME,
		  			'desc':rows[i].JOB_DESCRIPTION,
		  			'state':rows[i].JOB_LOCATION_STATE,
		  			'city': rows[i].JOB_LOCATION_CITY,
		  			'pref': rows[i].PREFERENCE
		  		}
		  		// Add object into array
		  		jobList.push(job);
		  		}

                callback(jobList);
            }
        });
    },

    // This function will insert data into the database. (create a new user)
    // body is an object
    create : function(body, callback)
    {
        console.log('second step');
        // this array will contain the values of the fields.
        var bind = [];
        // loop in the attributes of the object and push the values into the bind array.
        for(prop in body){
            bind.push(body[prop]);
        }
        // prepare the sql query
        let sql = `INSERT INTO LND_JOB_POSTINGS(CORPORATE_NAME, JOB_DESCRIPTION,
        REQUIRED_SKILLS, WORK_EXPERIENCE, CONTACT_NUMBER, PREFERENCE, JOB_LOCATION_CITY, JOB_LOCATION_STATE,
        OPEN_POSITIONS, EXPIRY_DATE, SALARY, COMPANY_REGISTRATION_NUMBER) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        // call the query give it the sql string and the values (bind array)
        pool.query(sql, bind, function(err, result) {
            if(err) throw err;
            // return the last inserted id. if there is no error
            console.log('job created');
            callback(result.insertId);
        });
    }

}

module.exports = Job;