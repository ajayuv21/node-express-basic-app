var fs = require("fs");
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})
app.get('/cities.html', function (req, res) {
   res.sendFile( __dirname + "/" + "cities.html" );
})


app.get('/createUser', function (req, res) {
   // Prepare output in JSON format
   response = {
      name:req.query.name,
      email:req.query.email,
      mobile:req.query.mobile
   };
   console.log(response);
   //res.end(JSON.stringify(response));
   res.sendFile( __dirname + "/" + "success.html" );
})

app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

app.get('/getCities', function (req, res) {
    console.log("city name::", req.query.city)
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('["Bangalore", "baad"]');
    res.end();
})

var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("curd app listening at http://%s:%s", host, port)

})