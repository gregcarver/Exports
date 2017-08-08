var express = require('express')
var path = require('path')
var api = require('./api');
var app = express();
var router = express.Router()
var bodyParser = require('body-parser')

app.use('/api',api);
app.use(bodyParser.json());

console.log('server on')
app.listen(3000)

module.exports=router

// var shortid = require('./shortid')
// var moment = require('./moment')
// var bodyparse = require('body-parser')
// app.use(bodyparser.json());

// var clientPath = path.join(__dirname, '/data.json')

// app.all(function(req,res,next){
// console.log('i am request')
// next();
// })