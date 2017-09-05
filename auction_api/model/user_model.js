var Promise = require("bluebird");
var jwt = require('jwt-simple');
var common = require('../common/common');
var connection = require("../common/database_helper");
function CreateUser(user) {
    return new Promise(function (resolve, reject) {
        connection.execute(function (err, con) {
            con.query('INSERT INTO user SET ?', user, function (error, results, fields) {
                con.release();
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    });
};
function GetUserByEmail(user) {
    return new Promise(function (resolve, reject) {
        connection.execute(function (err, con) {
            let query = con.query(`select email,account_type,name,phone from user where email = ?  and password = ?`, [user.email, user.password], function (error, results, fields) {
                con.release();
                if (error) {
                    reject(error);
                } else {          
                    console.log(results) 
                    if(results.length > 0){
                        var result = results[0];
                        result.token = jwt.encode(result,common.SECRET)
                        resolve(result);
                    }   else{
                        resolve({'error':1})
                    }    
                    
                }
            });
        })
    });
};
module.exports = {
    CreateUser: CreateUser,
    GetUserByEmail: GetUserByEmail
};