var fs = require('fs');
var express = require('express');
var multer  = require('multer');
var images = require("images");
var outJson = require("../../utils/outJson");

var router = express.Router();
var upload = multer({dest: 'upload_tmp/'});

router.post('/', upload.any(), function(req, res, next) {
    // 文件名字修改
    var timestamp=new Date().getTime();
    let rootDir = "./public"
    let saveDir = "/upload/a" + timestamp+"_"+req.files[0].originalname;
    let saveThumDir = "/upload/thum/thum_a" + timestamp+"_"+req.files[0].originalname;
    var des_file = rootDir + saveDir;
    var des_file_thum = rootDir + saveThumDir;
    fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
          images(des_file).size(400)
            .save(des_file_thum, {               
              quality : 100  
            });
            if( err ){
              res.json(outJson({},0,'文件上传失败'));
            }else{
              let successP = {
                "url":saveDir,
                "thum_url":saveThumDir
              }
              console.log( successP );
              res.json(outJson(successP,1,'文件上传成功'));
            }
        });
    });
});

module.exports = router;