var fs = require("fs");
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var { createMongoDBDataAPI } = require('mongodb-data-api');

app.use( bodyParser.json() );
app.use(express.static('public'));

const api = createMongoDBDataAPI({
   apiKey: 'lr6gxmzJ2BgOxwdfH1x0t5AHAwBSXUjUoZDcN3s3FJmVZVgZH2lpaDzKyaXerxVj',
   urlEndpoint: 'https://ap-south-1.aws.data.mongodb-api.com/app/data-oubos/endpoint/data/v1'
 })

app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.post('/jobs', function (req, res) {
   api
   .insertOne({
     dataSource: 'pc-cluster',
     database: 'test',
     collection: 'jobs',
     document: {
         reqId: req.body.reqId,
         title: req.body.title,
         experience: req.body.experience,
         location: req.body.location,
         skills: req.body.skills,
         jobDescription: req.body.jobDescription
     }
   })
   .then((result) => {
     console.log(result.insertedId);
     res.writeHead(200, {'Content-Type': 'application/json'});
     res.end(JSON.stringify(result));
   }).catch(err => {
      console.log(err);
      res.writeHead(500, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(err));
   })
})

app.get('/jobs', function (req, res) {
   api.$$action('find', {
      dataSource: 'pc-cluster',
      database: 'test',
      collection: 'jobs',
      filter: {}
    }).then(result =>{
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(result));
    }).catch(err => {
      console.log(err);
      res.writeHead(500, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(err));
   })
})

var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("curd app listening at http://%s:%s", host, port)
})
