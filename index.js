var express = require('express')
var path = require('path')
var api = require('./api');
var app = express();
var bodyParser = require('body-parser')
var clientP= path.join(__dirname, 'client')

app.use(express.static(clientP));
app.use('/api',api);
app.use(bodyParser.json());

console.log('server on')
app.listen(3000)


// var shortid = require('./shortid')
// var moment = require('./moment')
// var bodyparse = require('body-parser')
// app.use(bodyparser.json());

// var clientPath = path.join(__dirname, '/data.json')

// app.all(function(req,res,next){
// console.log('i am request')
// next();
// })