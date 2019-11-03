var express = require('express');
var router = express.Router();
var sql_connect = require('./sql_connect.js')
var db_config = sql_connect.db_config;
var mysql = require("mysql");


const format_model = function(rowData) {
  let response = {
    mu: [],
    w: [],
    lambda: [],
    mean: [],
    std: [],
  }

  for (row of rowData) {
    if (row.mu != null) {
      if (response.mu.length % 20 == 0) response.mu.push([])
      response.mu[response.mu.length-1].push(row.mu)
    }
    if (row.w != null) response.w.push(row.w)
    if (row.lambda != null) response.lambda.push(row.lambda)
    if (row.mean != null) response.mean.push(row.mean)
    if (row.std != null) response.std.push(row.std)

    console.log(response.mu)
  }
}

/* GET users listing. */
router.get('/', function (req, res, next) {
    var con;
    con = mysql.createConnection(db_config);
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });

  let query_string = `SELECT * FROM MODEL";`;
  console.log(query_string)
  con.query(query_string, (err, result) => {
    if (err) {
        con.destroy();
      res.send([])
    } else {
      console.log("returned ", result)
        con.destroy();
      res.send(result)
    }
  })
  console.log("model requested.")
});