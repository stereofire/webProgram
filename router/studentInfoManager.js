const express = require('express');
const getStudentQueryResult=require('../db/model/studentInfo.js')

const bodyParser = require('body-parser'); 
var urlEncodeParser = bodyParser.urlencoded({extended: false});

const router  = express.Router();

const fs = require("fs");

const multer = require("multer");
router.use(multer({ dest: '/tmp/'}).array('image'));

const methods=require("./methods.js");

router.post('/queryStudentInfo',urlEncodeParser,function(req,res){

    getStudentQueryResult(req.body,function(results){
        methods.sendResultForStudentInfoManager(results,res);
    });
})

router.post('/fileUpload', function (req, res) {
 
    console.log(req.files[0]);  // 上传的文件信息
  
    var des_file = __dirname + "/" + req.files[0].originalname;
    fs.readFile( req.files[0].path, function (err, data) {
         fs.writeFile(des_file, data, function (err) {
          if( err ){
               console.log( err );
          }else{
                response = {
                    message:'File uploaded successfully', 
                    filename:req.files[0].originalname
               };
           }
           console.log( response );
           res.send( JSON.stringify( response ) );
        });
    });
 })


module.exports = router;