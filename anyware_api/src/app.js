const express = require("express");
const cors = require("cors");
const app = express();
var mysql = require("mysql");

app.use(cors())

var users = require('./user.js')
var container = require('./container.js')
var warehouse = require('./warehouse.js')
var space = require('./space.js')
var sql_connect = require('./sql_connect.js')
var model = require('./model.js')

/*sql_connect.establish_connection;
setInterval(function(){sql_connect.maintain_connection}, 1);*/

//sql_connect.handleDisconnect;

app.get('/', (req, res) => {
    res.send("Anyware API listening on port 3000");
});
app.listen(process.env.PORT || 3000, () => {
    console.log("app listening on ", process.env.PORT || 3000);
});

app.use('/user', users);
app.use ('/container', container)
app.use ('/space', space)
app.use ('/warehouse', warehouse)
// app.use('/model', model)


