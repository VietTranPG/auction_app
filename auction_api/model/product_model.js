var Promise = require("bluebird");
var common = require('../common/common');
var connection = require("../common/database_helper");
function getAllType(){
    return new Promise(function (resolve, reject) {
        connection.execute(function (err, con) {
            con.query('SELECT * FROM product_type', function (error, results, fields) {
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
function addProductType(){
    return new Promise(function (resolve, reject) {
        connection.execute(function (err, con) {
            con.query('INSERT INTO product_type SET ?', type, function (error, results, fields) {
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
function getTypeById(id){
    return new Promise(function (resolve, reject) {
        connection.execute(function (err, con) {
            con.query('SELECT id,name from product_type where = ?',[id], function (error, results, fields) {
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

module.exports = {
    getAllType:getAllType,
    addProductType:addProductType,
    getTypeById:getTypeById
}