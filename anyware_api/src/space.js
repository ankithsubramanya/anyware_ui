/*

TODO create spaces once a warehouse is made

 */

var express = require('express');
var router = express.Router();
var sql_connect = require('./sql_connect.js')
var db_config = sql_connect.db_config;
var mysql = require("mysql");
/* GET spaces listing - search function*/
router.get('/search/:query_object', function(req, res, next) {
    var query_object = req.params.query_object;
    res.send('respond with a resource');

});
/* GET all available spaces in the city sorted by ascending order of price */
router.get('/city-listings/:city', function(req, res, next) {
    var con;
    con = mysql.createConnection(db_config);
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
    var city = req.params.city;

    var sql = "SELECT space.*, warehouse.idwarehouse, warehouse.city\n" +
        "FROM space\n" +
        "INNER JOIN warehouse ON space.idwarehouse=warehouse.idwarehouse\n" +
        "GROUP BY price ASC\n" +
        "HAVING is_available = 1 AND city = '" + city + "';";

    con.query(sql, function (err, result) {
        if (err) {
            con.destroy();
            throw err;
        }
        console.log(result);
        con.destroy();
        res.send(result)
    });
    console.log("Requested all listings")
});

/* GET all spaces */
router.get('/all-spaces', function(req, res, next) {
    var con;
    con = mysql.createConnection(db_config);
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
    var city = req.params.city;

    var sql = "SELECT * From space;"

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

router.get('/spaces-by-warehouse/:idwarehouse', function(req, res, next) {
    var con;
    con = mysql.createConnection(db_config);
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
    var idwarehouse = req.params.idwarehouse;

    var sql = "SELECT s.* \n" +
        "From space s, spacexwarehouse sw\n" +
        "Where s.idspace = sw.idspace and sw.idwarehouse = " + idwarehouse + ";";

    con.query(sql, function (err, result) {
        if (err) {
            con.destroy();
            throw err;
        }
        console.log(result);
        con.destroy();
        res.send(result);
    });
    console.log("Requested space by warehouse")
});


router.get('/reserved-by-borrower/:borrower_email', function(req, res, next) {
    var con;
    con = mysql.createConnection(db_config);
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
    var email = req.params.borrower_email;

    var sql = "SELECT space.*\n" +
        "FROM space, spacexuser, user\n" +
        "WHERE space.idspace=spacexuser.idspace AND user.iduser=spacexuser.iduser AND user.email='" + email + "';";

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

router.get('/lender-listings/:lender_email', function(req, res, next) {
    var con;
    con = mysql.createConnection(db_config);
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
    var email = req.params.lender_email;

    var sql = "SELECT * From space;"

    con.query(sql, function (err, result) {
        if (err) {
            con.destroy();
            throw err;
        }
        console.log(result);
        con.destroy();
        res.send(result)
    });
    console.log("Requested all listings")
});

router.put('/reserve-space/:idspace/:idcontainer', function(req, res, next) {
    var con;
    con = mysql.createConnection(db_config);
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
    var idspace = req.params.idspace;
    var idcontainer = req.params.idcontainer;

    var sql_space = "UPDATE space SET is_available = 0 where idspace=" + idspace + ";";
    var sql_container = "UPDATE container SET idspace =" + idspace + ";";
    var sql_x = "INSERT into containerxspace values (" + idcontainer + "," + idspace + "," + idcontainer + ");";

    con.query(sql_space, function (err, result) {
        if (err) {
            con.destroy();
            throw err;
        }
        console.log("INSERT " + result);
        con.query(sql_x, function (err, result) {
            if (err) {
                con.destroy();
                throw err;
            }
            con.query(sql_container, function (err, result) {
                if (err) {
                    con.destroy();
                    throw err;
                }
                console.log("INSERT " + result);
                con.destroy();
                res.send (result);
            });
        });
    });
    console.log("Requested all listings")
});


router.put('/unreserve-space/:idspace/:idcontainer', function(req, res, next) {
    var con;
    con = mysql.createConnection(db_config);
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
    var idspace = req.params.idspace;
    var idcontainer = req.params.idcontainer;

    var sql_space = "UPDATE space SET is_available = 1 where idspace=" + idspace + ";";
    var sql_x = "Delete from containerxspace where idcontainerxspace= " + idcontainer +";";
    var sql_container = "UPDATE container SET idspace = NULL Where idcontainer = " + idcontainer +";";
    con.query(sql_space, function (err, result) {
        if (err) {
            con.destroy();
            throw err;
        }
        console.log("INSERT " + result);
        con.query(sql_x, function (err, result) {
            if (err) {
                con.destroy();
                throw err;
            }
            con.query(sql_container, function (err, result) {
                if (err) {
                    con.destroy();
                    throw err;
                }
                console.log("INSERT " + result);
                con.destroy();
                res.send (result);
            });
        });
    });
    console.log("Requested all listings")
});




router.delete('/delete-space/:space_id', function(req, res, next) {
    var con;
    con = mysql.createConnection(db_config);
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
    var idspace = req.params.space_id;

    var sql = "DELETE FROM space WHERE idspace = " + idspace + ";";
    var sql_= "DELETE FROM spacexwarehouse WHERE idspacexwarehouse =" + idspace + ";";

    con.query(sql_space, function (err, result) {
        if (err) throw err;
        console.log("INSERT " + result);
        con.query(sql_x, function (err, result) {
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

router.post ("/insert-space/:data" , function(req, res, next) {
    var con;
    con = mysql.createConnection(db_config);
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
    var space_obj = JSON.parse(req.params.data);
    space_obj = space_obj[0];
    console.log(space_obj)
    var dimension_height_inches = space_obj.dimension_height_inches;
    var dimension_width_inches = space_obj.dimension_width_inches;
    var dimension_length_inches = space_obj.dimension_length_inches;
    var price = space_obj.price
    var is_available = space_obj.is_available;
    var idspace_decimal = Math.random() * 1000000;
    var idspace = Math.floor(idspace_decimal);
    var idwarehouse = 1;

    var posting_string = "(" + idspace + "," + idwarehouse + "," + price + "," +
        dimension_width_inches + "," + dimension_height_inches + "," + dimension_length_inches + "," +
        is_available + ")";
    var sql = "INSERT INTO space VALUES" + posting_string + ";";

    var sql_x = "INSERT into spacexwarehouse values (" + idspace + "," + idspace + "," + idwarehouse + ");";

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("INSERT " + result);
        con.query(sql_x, function (err, result) {
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

router.put("/update-space/:data", function(req, res, next) {
    var con;
    con = mysql.createConnection(db_config);
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
    var space_obj = JSON.parse(req.params.data);
    space_obj = space_obj[0];
    console.log(space_obj)
    var dimension_height_inches = space_obj.dimension_height_inches;
    var dimension_width_inches = space_obj.dimension_width_inches;
    var dimension_length_inches = space_obj.dimension_length_inches;
    var price = space_obj.price
    var is_available = space_obj.is_available;
    var idspace = space_obj.idspace;
    var idwarehouse = space_obj.idwarehouse;

    var posting_string = "idwarehouse =" + idwarehouse + ", price = " + price + ", dimension_width_inches=" +
        dimension_width_inches + ",dimension_height_inches=" + dimension_height_inches + ",dimension_length_inches=" + dimension_length_inches + ",is_available=" +
        is_available;
    // var sql = "INSERT INTO space VALUES" + posting_string + ";";
    var sql = "UPDATE space Set " + posting_string + " WHERE idspace=" + idspace + ";";
    console.log(sql)
    con.query(sql, function (err, result) {
        if (err) {
            con.destroy();
            throw err;
        }
        console.log("UPDATED" + result);
        con.destroy();
        res.send ("UPDATED " + idspace);
    });
    console.log("Requested all listings")
});

module.exports = router;