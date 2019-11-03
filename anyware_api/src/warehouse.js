/*
TODO for insert warehouse - create and insert all associated space objects
TODO for delete warehouse - delete all associated space objects
 */


var express = require('express');
var router = express.Router();
var sql_connect = require('./sql_connect.js')
var db_config = sql_connect.db_config;
var mysql = require("mysql");
var warehouse_breaker = require ('./warehouse_breaker');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//     res.send('respond with a resource');
// });
/* GETs warehouses owned by a specific user */
router.get('/email/:email_id', function(req, res, next) {
    console.log('endpoint /')
    var con;
    con = mysql.createConnection(db_config);
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
    var email_encoded = req.params.email_id;
    var email_id = (email_encoded);
    var sql = "SELECT warehouse.*\n" +
        "FROM warehouse, warehousexuser\n" +
        "WHERE emailuser='" + email_id + "' AND warehouse.idwarehouse = warehousexuser.idwarehouse;\n";
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err){
            console.log("Query did not work")
            throw err;
            con.destroy();
            res.send(err);
        }
        console.log(result);
        con.destroy();
        res.send(result)
    });
    console.log("Requested warehouse listings by user");
});

/* Insert warehouse given warehouse details and emailid */
router.post ("/:data" , function(req, res, next) {
    var con;
    con = mysql.createConnection(db_config);
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
    var encoded_array = req.params.data;
    var array = JSON.parse(decodeURIComponent(encoded_array));
    console.log(array);
    console.log(array[0]);
    console.log(array[1]);
    var email_id = array[0];
    var warehouse_object = array [1];
    var idwarehouse = warehouse_object.idwarehouse;
    var number_spaces = warehouse_object.number_spaces;
    var city = warehouse_object.city;
    var width = warehouse_object.width_feet;
    var length = warehouse_object.length_feet;
    var idwarehouse_decimal = Math.random() * 1000000000;
    idwarehouse = Math.floor(idwarehouse_decimal);
    var id_xuser = idwarehouse;
    var posting_string_warehouse = "(" + idwarehouse + "," + number_spaces + ",'" + city + "', " + width + "," + length + ")";
    var sql_warehouse = "INSERT INTO warehouse VALUES" + posting_string_warehouse + ";";
    var posting_string_xuser = "(" + id_xuser + "," + idwarehouse + ",'" + email_id + "'" + ")";
    var sql_xuser = "INSERT INTO warehousexuser VALUES" + posting_string_xuser + ";";
    console.log(sql_warehouse);
    console.log(sql_xuser);
    // console.log(spaces_all_sql);
    con.query(sql_warehouse, function (err, result) {
        if (err) {
            con.destroy();
            throw err;
        }
        con.query(sql_xuser, function (err, result) {
            if (err) {
                con.destroy();
                throw err;
            }
            res.send(result)
        });
    });
    console.log("Inserted warehouse");
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
    var warehouse_object = JSON.parse(decodeURIComponent(req.params.data));
    warehouse_object = warehouse_object;
    console.log(warehouse_object);
    var idwarehouse = warehouse_object.idwarehouse;
    var number_spaces = warehouse_object.number_spaces;
    var city = warehouse_object.city;
    var width = warehouse_object.width_feet;
    var length = warehouse_object.length_feet;
    var posting_string = "idwarehouse =" + idwarehouse + ", number_spaces = " + number_spaces + ", city= '" +
        city + "', width_feet = " + width + ", length_feet=" + length;
    // var sql = "INSERT INTO space VALUES" + posting_string + ";";
    var sql = "UPDATE warehouse Set " + posting_string + " WHERE idwarehouse=" + idwarehouse + ";";
    console.log(sql)
    con.query(sql, function (err, result) {
        if (err) {
            con.destroy();
            throw err;
        }
        console.log("UPDATED" + result);
        con.destroy();
        res.send (result);
    });
    console.log("Requested all listings")
});

/* GET all spaces */
router.get('/all-warehouses', function(req, res, next) {
  console.log('endpoint ALL WAREHOUSES')
    var con;
    con = mysql.createConnection(db_config);
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
    var sql = "SELECT * From warehouse;"
    con.query(sql, function (err, result) {
        if (err) {
            con.destroy();
            throw err;
        }
        console.log(result);
        con.destroy();
        res.send(result);
    });
    console.log("Requested all listings")
});

router.delete('/:idwarehouse', function(req, res, next) {
    var con;
    con = mysql.createConnection(db_config);
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
    var idwarehouse = req.params.idwarehouse;
    var id_xuser = idwarehouse;
    var sql_warehouse = "DELETE FROM warehouse WHERE idwarehouse = " + idwarehouse + ";";
    var sql_xuser = "DELETE FROM warehousexuser WHERE idwarehousexuser = " + id_xuser + ";";
    console.log(sql_warehouse);
    console.log(sql_xuser);
    con.query(sql_warehouse, function (err, result) {
        if (err) throw err;
        console.log("INSERT " + result);
        con.query(sql_xuser, function (err, result) {
            if (err) {
                con.destroy();
                throw err;
            }
            console.log("INSERT " + result);
            con.destroy();
            res.send (result);
        });
    });
    console.log("Requested all listings")
});

router.get('/optimal-arrangement/:warehouse_width/:warehouse_length/:warehouse_id', function(req, res, next) {
    var width = req.params.warehouse_width;
    var length = req.params.warehouse_length;
    var warehouse_id = req.params.warehouse_id;
    var result = warehouse_breaker.create_spaces(width, length, warehouse_id);
    console.log(`Receieved ${result.length} listings ${typeof result}`)
    res.send(result);
    console.log("Requested all listings")
});

module.exports = router;