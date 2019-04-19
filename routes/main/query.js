var express = require('express');
var router = express.Router();
var outJson = require("../../utils/outJson");
var mysqlUtil = require("../../utils/mysqlUtil")

router.post('/', function(req, res, next){
  let querySql = 'select * from main_waterfall'
  console.log('querySql', querySql)
  mysqlUtil(querySql, function (qerr,vals,fields) {
    res.json(outJson({'list': vals}, 1, '成功'));
  }, function (error) {
    res.json(outJson({}, 0, '失败'));
  })
})
router.get('/', function(req, res, next){
  let querySql = 'select * from main_waterfall'
  console.log('querySql', querySql)
  mysqlUtil(querySql, function (qerr,vals,fields) {
    res.json(outJson({'list': vals}, 1, '成功'));
  }, function (error) {
    res.json(outJson({}, 0, '失败'));
  })
})
module.exports = router