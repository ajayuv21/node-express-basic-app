var fs = require("fs");
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var { createMongoDBDataAPI } = require('mongodb-data-api');

app.use( bodyParser.json() );
app.use(express.static('public'));

const api = createMongoDBDataAPI({
   apiKey: 'mAoEjYd86Hlb4jvmIQLV1voMpATzcmdnDSSoS0wGYYWEWAW490Sc1sJczhHUNksY',
   urlEndpoint: 'https://data.mongodb-api.com/app/data-anhmq/endpoint/data/v1'
 })

app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.post('/createUser', function (req, res) {
   // Prepare output in JSON format
   api
   .insertOne({
     dataSource: 'Cluster0',
     database: 'pc_db',
     collection: 'pc_data',
     document: {
         user_id: req.body.id,
         name: req.body.name,
         email: req.body.email,
         photoUrl: req.body.photoUrl
     }
   })
   .then((result) => {
     console.log(result.insertedId);
     res.writeHead(200, {'Content-Type': 'application/json'});
     res.end(JSON.stringify(result));
   }).catch(err => {
      console.log(err);
   })
   
})

app.get('/listUsers', function (req, res) {
   api.$$action('find', {
      dataSource: 'Cluster0',
      database: 'pc_db',
      collection: 'pc_data',
      filter: {}
    }).then(result =>{
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(result));
    })
})

var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("curd app listening at http://%s:%s", host, port)
})