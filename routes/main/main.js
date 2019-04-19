var express = require('express');
var router = express.Router();
var outJson = require("../../utils/outJson");
var mysqlUtil = require("../../utils/mysqlUtil")

router.post('/delete', function (req, res, next) {
  let id = req.body.id
  if (!id ) {
    res.json(outJson({}, 0, '参数有误'));
  } else {
    // let insertSQL = "INSERT INTO `main_waterfall` VALUES ('"+req.body.title+"', 'test', '1', '2', 'text', '00000000001', null, null, null, null, null, null)"
    let deleteSQL = "DELETE FROM  `main_waterfall` WHERE id='" + id + "'"
    console.log(deleteSQL)
    // 先写insert sql
    mysqlUtil(deleteSQL,function (qerr,vals,fields) {
      res.json(outJson({}, 1, '成功'));
    }, function (error) {
      console.log(error)
      res.json(outJson({}, 0, '失败'));
    })
  }
})
router.post('/save', function (req, res, next) {
  let title = req.body.title
  let content = req.body.content
  let url = req.body.url
  let url_thum = req.body.url_thum
  let type = req.body.type
  if (!title || !(content || url) || !type) {
    res.json(outJson({}, 0, '参数有误'));
  } else {
    // let insertSQL = "INSERT INTO `main_waterfall` VALUES ('"+req.body.title+"', 'test', '1', '2', 'text', '00000000001', null, null, null, null, null, null)"
    let insertSQL = "INSERT INTO `main_waterfall` (title, content, url_thum, url, type) VALUES ( '" + title + "', '" + content + "', '" + url_thum + "', '" + url + "', '" + type + "')"
    console.log(insertSQL)
    // 先写insert sql
    mysqlUtil(insertSQL,function (qerr,vals,fields) {
      res.json(outJson({}, 1, '成功'));
    }, function (error) {
      console.log(error)
      res.json(outJson({}, 0, '失败'));
    })
  }
})

module.exports = router