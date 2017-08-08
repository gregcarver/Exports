var express = require('express')
var moment = require('moment')
var app = express();

console.log('touching moments')
function timeStamp (req,res,next){
    var timeStamp = moment().format()
    return req.body.timeStamp = timeStamp,
    next();
}
module.exports=timeStamp