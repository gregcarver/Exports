var express = require('express')
var app = express();
var shortid = require('shortid')

function idHandle(req,res,next){
    return req.body.id=shortid.generate(),
    next();
}
module.exports=idHandle