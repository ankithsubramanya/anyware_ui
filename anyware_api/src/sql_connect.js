const express = require("express");
const cors = require("cors");
const app = express();
var mysql = require("mysql");

var CLEARDB_DATABASE_ENTIRE_URL = "mysql:\\\\b14a395b24b59c:e35677ae@us-cdbr-iron-east-03.cleardb.net\\heroku_d21d5d39f168867?reconnect=true"
var CLEARDB_DATABASE_URL = "us-cdbr-iron-east-03.cleardb.net"
var CLEARDB_DATABASE_USERNAME = "b14a395b24b59c"
var CLEARDB_DATABASE_PASSWORD = "e35677ae"
var CLEARDB_DATABASE_NAME = "heroku_d21d5d39f168867"

/*
var con = mysql.createConnection({
    host: CLEARDB_DATABASE_URL,
    user: CLEARDB_DATABASE_USERNAME,
    password: CLEARDB_DATABASE_PASSWORD,
    database: CLEARDB_DATABASE_NAME,
    pool: {
        min: 5
    }
});
*/

var db_config = {
    host: CLEARDB_DATABASE_URL,
    user: CLEARDB_DATABASE_USERNAME,
    password: CLEARDB_DATABASE_PASSWORD,
    database: CLEARDB_DATABASE_NAME,
    pool: {
        min: 5
    }
};

//var con;
/*
function handleDisconnect() {
    con = mysql.createConnection(db_config); // Recreate the connection, since
                                                    // the old one cannot be reused.

    con.connect(function(err) {              // The server is either down
        if(err) {                                     // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    con.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

*/



var establish_connection = function () {
    //con = mysql.createConnection(db_config);
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
     con.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            establish_connection();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

var maintain_connection = function () {
    con.query('SELECT 1');
}
/*
module.exports.establish_connection = establish_connection();
module.exports.con = con;
module.exports.maintain_connection = maintain_connection();*/
//module.exports.handleDisconnect = handleDisconnect();
module.exports.db_config = db_config;