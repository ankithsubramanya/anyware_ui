var express = require('express');
var router = express.Router();
var sql_connect = require('./sql_connect.js')
var db_config = sql_connect.db_config;
var mysql = require("mysql");

/* GET users listing. */
router.get('/:data', function (req, res, next) {
    var con;
    con = mysql.createConnection(db_config);
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
  // res.send('respond with a resource');
  let data_string = req.params.data

  let query_string = `SELECT container.*\n
    FROM container, containerxuser\n
    WHERE container.idcontainer=containerxuser.idcontainer AND containerxuser.emailuser="${data_string}";`;
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
  console.log("containers requested.")
});

router.delete('/:data', function (req, res, next) {
    var con;
    con = mysql.createConnection(db_config);
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
  // res.send('respond with a resource');
  let data_string = req.params.data
  let query_string = `DELETE FROM container WHERE idcontainer=${data_string};`;
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
  console.log("containers deleted.")
});

router.post('/:data', function (req, res, next) {
    var con;
    con = mysql.createConnection(db_config);
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
  // res.send('respond with a resource');
  let data_string = req.params.data
  let full_obj = JSON.parse(decodeURIComponent(data_string))
  let data_obj = full_obj[1];
  let uname = full_obj[0]

  // console.log("read object ", data_obj[0]);
  // console.log("read object ", data_obj[1]);


  if (data_obj.idcontainer == -1) data_obj.idcontainer = Math.random() * 1000000
  if (data_obj.dimension_width_inches == undefined) data_obj.dimension_width_inches = 'NULL'
  if (data_obj.dimension_height_inches == undefined) data_obj.dimension_height_inches = 'NULL'
  if (data_obj.dimension_length_inches == undefined) data_obj.dimension_length_inches = 'NULL'
  if (data_obj.weight_pounds == undefined) data_obj.weight_pounds = 'NULL'

  console.log("read container: ", data_obj)
  // res.send([])
  // return

  let query_string = `INSERT INTO container (idcontainer, idspace, dimension_width_inches,\n
  dimension_height_inches, dimension_length_inches, weight_pounds)\n
  VALUES (${data_obj.idcontainer}, NULL, ${data_obj.dimension_width_inches}, \n
    ${data_obj.dimension_height_inches}, ${data_obj.dimension_length_inches}, ${data_obj.weight_pounds});`;
  console.log(query_string)
  con.query(query_string, (err, result) => {
    if (err) {
      console.log("POST failed.")
      console.log(err)
      res.send([])
    } else {
      console.log("POST query returned ", result)

      let assign_string = `INSERT INTO containerxuser (idcontainerxuser, idcontainer, emailuser)
      VALUES(${data_obj.idcontainer}, ${data_obj.idcontainer}, "${uname}")`
      console.log(assign_string)
      con.query(assign_string, (err, result) => {
        if (err) {
          console.log("POST failed.")
          console.log(err)
            con.destroy();
          res.send([])
        } else {
            con.destroy();
          res.send(result)
        }
      })
    }
  })
  console.log("containers posted.")
});

router.put('/:data', function (req, res, next) {
    var con;
    con = mysql.createConnection(db_config);
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
  // res.send('respond with a resource');
  let data_string = req.params.data
  let data_obj = JSON.parse(decodeURIComponent(data_string))

  if (data_obj.idcontainer == undefined) data_obj.idcontainer = Math.random() * 1000000
  if (data_obj.dimension_width_inches == undefined) data_obj.dimension_width_inches = 'NULL'
  if (data_obj.dimension_height_inches == undefined) data_obj.dimension_height_inches = 'NULL'
  if (data_obj.dimension_length_inches == undefined) data_obj.dimension_length_inches = 'NULL'
  if (data_obj.weight_pounds == undefined) data_obj.weight_pounds = 'NULL'

  console.log("read container: ", data_obj)
  // res.send([])
  // return

  let query_string = `UPDATE container
  SET idspace=NULL, dimension_width_inches 
  = ${data_obj.dimension_width_inches}, dimension_height_inches = ${data_obj.dimension_height_inches},
   dimension_length_inches = ${data_obj.dimension_length_inches}, weight_pounds = ${data_obj.weight_pounds}
  WHERE idcontainer='${data_obj.idcontainer}';`;
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
  console.log("containers requested.")
});



module.exports = router;