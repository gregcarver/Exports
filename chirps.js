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




router.route('/')
    .get(function(req,res){
        console.log("get req")
            fs.readFile(clientPath, 'utf-8',function(err,file){
            if(err){
                res.status(500)
            }else{
                res.write(file);
                res.end();
            }
        })
})
    .post(moment,shortid,function(req,res){
        console.log('posted')
        fs.readFile(clientPath, 'utf-8', function(err,file){
            if (err){
                res.status(500)
            }else{
                var data = JSON.parse(file)
                var chirp=req.body

                data.push(chirp)
            }
        fs.writeFile(clientPath, JSON.stringify(data),function(err,file){
            if(err){
                res.status(500)
            }else{
                  res.send(req.body)
            }
        })  
        })
    });
router.route('/one/:id')
    .get(function(req,res){
        console.log(req)
        fs.readFile(clientPath, 'utf-8',function(err,file){
            if(err){
                res.status(500)
            }else{
                var arr = JSON.parse(file);
                var id = req.params.id
                var result;
                
                arr.forEach(function(element) {
                 if(element.id === id){
                     result = element;
                 }   
                });
            if(result){
                res.send(result);

            }else{
                res.status(500);
                res.end();
            }
            }
        })
    })
    .delete(function(req,res){
        fs.readFile(clientPath, 'utf-8', function(err,file){
            if (err){
                res.status(500)
               
            }else{
                var id = req.params.id
                var arr= JSON.parse(file)
                var result;
                var deleteIndex=-1
                arr.forEach(function(element,i) {
                    if(element.id===id){
                        deleteIndex=i;
                    }
                    if(deleteIndex!=-1){
                        arr.splice(deleteIndex,1);
                        fs.writeFile(clientPath, JSON.stringify(arr),function(err,success){
                            if(err){
                                res.status(500)
                            }else{
                                res.send(JSON.stringify(arr));
                            }
                        })
                    }
                });
            } 
        })
    })
    .put(function(req,res){
        console.log(req.params.id)
        fs.readFile(clientPath, 'utf-8',function(err,file){
            if(err){
                res.status(500)
            }else{
                var arr = JSON.parse(file);
                var id = req.params.id
                var result;
                var chirp=req.body
                arr.forEach(function(element) {
                 if(element.id === id){
                     element.user=chirp.user
                     element.message=chirp.message
                     result = element
                 }   
                });
        }
        fs.writeFile(clientPath, JSON.stringify(arr),function(err,file){
            if(err){
                res.status(500)
            }else{
                  res.send(req.body)
            }
        })  
        })

    })   
    module.exports=router
// app.listen(3000)