var express = require('express')
var shortid= require('./shortid')
var moment = require('./moment')
var path=require('path')
var clientPath = path.join(__dirname, 'user.json')
var fs = require('fs')
var app = express();
var router = express.Router();
var bodyParser = require('body-parser')
router.use(bodyParser.json());
var proc = require('./user.proc')

router.route('/')
    .get(function(req,res,next){
        proc.all()
            .then(function (success) {
                res.send(success);
            }, function(err) {
                console.log(err);
                res.sendStatus(500);
    });
})
    .post(function(req,res){
        proc.create(req.body)
            .then(function (success) {
                res.send(success);
            }, function(err) {
                console.log(err);
                res.sendStatus(500);
    });
    });
// router.route('/user/:id')
//     .get(function(req,res){
//         console.log(req)
//         proc.read(req.params.id)
//             .then(function (success) {
//                 res.send(success);
//             }, function(err) {
//                 console.log(err);
//                 res.sendStatus(500);
//     });
//     })
//     .delete(function(req,res){
//         proc.destroy(req.params.id)
//             .then(function (success) {
//                 res.send(success);
//             }, function(err) {
//                 console.log(err);
//                 res.sendStatus(500);
//     });
//     })


module.exports=router