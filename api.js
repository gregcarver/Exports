var express = require('express');
var chirps = require('./chirps')
var app = express()
var router = express.Router()

router.use('/chirps',chirps)

module.exports = router;
// app.use(router)

// router.use('/moment', moment)
// router.use('/shortid', shortid)
// router.all('/',function(req,res,next){
//     console.log('someone made request')
//     next()
// })



// var moment = require('./moment')
// var shortid = require('./shortid')