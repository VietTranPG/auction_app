var mysql = require('mysql');
function Connection() {
    this.pool = mysql.createPool({
        connectionLimit: 100,
        host: "localhost",
        user: "root",
        password: "",
        database: "auction_app"
    });
    this.execute = function (callback) {
        this.pool.getConnection(function (err, connection) {
            callback(err, connection);
        });
    };
}
module.exports = new Connection();