var express = require('express')
var shortid= require('./shortid')
var moment = require('./moment')
var path=require('path')
var clientPath = path.join(__dirname, '/data.json')
var fs = require('fs')
var app = express();
var router = express.Router();
var bodyParser = require('body-parser')
router.use(bodyParser.json());
var proc = require('./proc')
var userProc = require('./user.proc')




// router.route('/')
//     .get(function(req,res){
//         console.log("get req")
//             fs.readFile(clientPath, 'utf-8',function(err,file){
//             if(err){
//                 res.status(500)
//             }else{
//                 res.write(file);
//                 res.end();
//             }
//         })
// })
//     .post(moment,shortid,function(req,res){
//         console.log('posted')
//         fs.readFile(clientPath, 'utf-8', function(err,file){
//             if (err){
//                 res.status(500)
//             }else{
//                 var data = JSON.parse(file)
//                 var chirp=req.body

//                 data.push(chirp)
//             }
//         fs.writeFile(clientPath, JSON.stringify(data),function(err,file){
//             if(err){
//                 res.status(500)
//             }else{
//                   res.send(req.body)
//             }
//         })  
//         })
//     });
// router.route('/one/:id')
//     .get(function(req,res){
//         console.log(req)
//         fs.readFile(clientPath, 'utf-8',function(err,file){
//             if(err){
//                 res.status(500)
//             }else{
//                 var arr = JSON.parse(file);
//                 var id = req.params.id
//                 var result;
                
//                 arr.forEach(function(element) {
//                  if(element.id === id){
//                      result = element;
//                  }   
//                 });
//             if(result){
//                 res.send(result);

//             }else{
//                 res.status(500);
//                 res.end();
//             }
//             }
//         })
//     })
//     .delete(function(req,res){
//         fs.readFile(clientPath, 'utf-8', function(err,file){
//             if (err){
//                 res.status(500)
               
//             }else{
//                 var id = req.params.id
//                 var arr= JSON.parse(file)
//                 var result;
//                 var deleteIndex=-1
//                 arr.forEach(function(element,i) {
//                     if(element.id===id){
//                         deleteIndex=i;
//                     }
//                     if(deleteIndex!=-1){
//                         arr.splice(deleteIndex,1);
//                         fs.writeFile(clientPath, JSON.stringify(arr),function(err,success){
//                             if(err){
//                                 res.status(500)
//                             }else{
//                                 res.send(JSON.stringify(arr));
//                             }
//                         })
//                     }
//                 });
//             } 
//         })
//     })
//     .put(function(req,res){
//         console.log(req.params.id)
//         fs.readFile(clientPath, 'utf-8',function(err,file){
//             if(err){
//                 res.status(500)
//             }else{
//                 var arr = JSON.parse(file);
//                 var id = req.params.id
//                 var result;
//                 var chirp=req.body
//                 arr.forEach(function(element) {
//                  if(element.id === id){
//                      element.user=chirp.user
//                      element.message=chirp.message
//                      result = element
//                  }   
//                 });
//         }
//         fs.writeFile(clientPath, JSON.stringify(arr),function(err,file){
//             if(err){
//                 res.status(500)
//             }else{
//                   res.send(req.body)
//             }
//         })  
//         })

//     })   
//     module.exports=router
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
    .post(moment,shortid,function(req,res){
        proc.create(req.body)
            .then(function (success) {
                res.send(success);
            }, function(err) {
                console.log(err);
                res.sendStatus(500);
    });
    });
router.route('/one/:id')
    .get(function(req,res){
        proc.read(req.params.id)
            .then(function (success) {
                res.send(success);
            }, function(err) {
                console.log(err);
                res.sendStatus(500);
    });
    })
    .delete(function(req,res){
        proc.destroy(req.params.id)
            .then(function (success) {
                res.send(success);
            }, function(err) {
                console.log(err);
                res.sendStatus(500);
    });
    })
    .put(function(req,res){
        proc.update(req.body)
            .then(function (success) {
                res.send(success);
            }, function(err) {
                console.log(err);
                res.sendStatus(500);
    });
})
router.route('/user/:id')
    .get(function(req,res){
        console.log(req)
        proc.single(req.params.id)
            .then(function (success) {
                res.send(success);
            }, function(err) {
                console.log(err);
                res.sendStatus(500);
    });
    })
    .delete(function(req,res){
        proc.destroyIt(req.params.id)
            .then(function (success) {
                res.send(success);
            }, function(err) {
                console.log(err);
                res.sendStatus(500);
    });
})









// router.route('/user/:id')
//     .get(function(req,res){
//     fs.readFile(clientPath, "utf-8" , function(err,file){
//     if(err){
//         res.sendStatus(500)
//     }
//     if (!req.params.id){
//        return res.sendStatus(400)
//     }
//     var id = req.params.id
//     var parsed = JSON.parsed(file)

//     var userChirps = parsed.filter(function(chirp){
//         if(chirp.userid == id){
//             return true;
//         }
//     })
//     if(userChirps.length===0){
//       return  res.sendStatus(500)
//     }
//     res.send(userChirps)
// })
// })
    module.exports=router