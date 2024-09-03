var fs = require("fs");
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var { createMongoDBDataAPI } = require('mongodb-data-api');

app.use( bodyParser.json() );
app.use(express.static('public'));

let users = [{id:1, name:"ravi"}, {id:2,name:"siva"}]

app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})
app.post('/createUser', function (req, res) {
   // Prepare output in JSON format
   let user = {id: req.body.id,
         name: req.body.name}
   users.push(user);
   res.writeHead(200, {'Content-Type': 'application/json'});
   res.end(JSON.stringify(user));
})

app.get('/listUsers', function (req, res) {
   res.writeHead(200, {'Content-Type': 'application/json'});
   res.end(JSON.stringify(users));
})

var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("curd app listening at http://%s:%s", host, port)
})