var express = require('express');
var router = express.Router();
var sql_connect = require('./sql_connect.js')
var db_config = sql_connect.db_config;
var mysql = require("mysql");
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* GET users listing. */
router.get('/:email_id', function(req, res, next) {
    var con;
    con = mysql.createConnection(db_config);
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
    var email_encoded = req.params.email_id;
    var email_id = decodeURIComponent(email_encoded);
    var sql = "Select * \n" +
        "From user\n" +
        "Where email = '" + email_id+ "';";

    con.query(sql, function (err, result) {
        if (err){
            console.log("Query did not work")
            con.destroy();
            throw err;
            res.send(err);
        }
        console.log(result);
        con.destroy();
        res.send(result)
    });
    console.log("Requested user")
});

router.post ("/:data" , function(req, res, next) {
    var con;
    con = mysql.createConnection(db_config);
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
    var encoded_data_obj = req.params.data;
    var data_obj = decodeURIComponent(encoded_data_obj);
    var user_obj = JSON.parse(data_obj)[0];
    console.log("Recieved: ",user_obj);
    var name = user_obj.name;
    var telephone_number = user_obj.telephone_number;
    var email = user_obj.email;
    var city = user_obj.city;
    var iduser_decimal = Math.random() * 10000000;
    var iduser = Math.floor(iduser_decimal);

    var posting_string = "(" + iduser + ",'" + name + "','" + telephone_number + "','" +
        email + "','" + city + "')";
    var sql = "INSERT INTO user VALUES" + posting_string + ";";
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) {
            con.destroy();
            throw err;
        }
        console.log("INSERT " + result);
        con.destroy();
        res.send ("INSERTED " + email);
    });
    console.log("Requested all listings")
});

router.put("/:data", function(req, res, next) {
    var con;
    con = mysql.createConnection(db_config);
    con.connect(function (err) {
        if (err) {
            throw err;
        }
        console.log("Connected!");
    });
    var encoded_data_obj = req.params.data;
    var data_obj = decodeURIComponent(encoded_data_obj);
    var user_obj = JSON.parse(data_obj);
    // user_obj = user_obj[0];
    console.log(user_obj);
    var name = user_obj.name;
    var telephone_number = user_obj.telephone_number;
    var email = user_obj.email;
    var city = user_obj.city;
    // var iduser = user_obj.iduser;
    var iduser = 5;
    

    var posting_string = "iduser= " + iduser + ", name = '" + name + "', telephone_number = '" + telephone_number + "', email= '" +
        email + "',city='" + city + "'";
    // var sql = "INSERT INTO space VALUES" + posting_string + ";";
    var sql = "UPDATE user Set " + posting_string + " WHERE email='" + email + "';";
    console.log(sql)
    con.query(sql, function (err, result) {
        if (err) {
            con.destroy();
            throw err;
        }
        con.destroy();
        res.send (result);
    });
    console.log("Requested all listings");
});

router.delete('/:email_id', function(req, res, next) {
    var con;
    con = mysql.createConnection(db_config);
    con.connect(function (err) {
        if (err) {
            throw err;
        }
        console.log("Connected!");
    });
    var email_encoded = req.params.email_id;
    var email_id = (email_encoded);
    var sql = "DELETE FROM user WHERE email = '" + email_id + "';";
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) {
            con.destroy();
            throw err;
        }
        console.log("DELETE" + result);
        con.destroy();
        res.send ("DELETED " + email_id);
    });
    console.log("Requested all listings")
});
module.exports = router;

