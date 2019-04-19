var express = require('express');
var tokenUtil = require('../../utils/token');
var outJson = require("../../utils/outJson");
var userPojo = require("../../dao/userPojo")
var router = express.Router();

/* GET home page. */
router.get('/login', function (req, res, next) {
  let un = req.query.username
  let pd = req.query.password
  if (un && pd) {
    userPojo.queryUser(un, pd, function (vals) {
      if (vals && vals.length > 0) {
        let tokenD = tokenUtil.createTokenReturn(vals[0])
        res.json(outJson(tokenD, 1, '登陆成功!'));
      } else {
        res.json(outJson({}, 0, '账号或者密码有误!'));
      }
    }, function () {
      res.json(outJson({}, 0, '账号或者密码有误!'));
    })
  } else {
    res.json(outJson({}, 0, '账号或者密码有误!'));
  }
});
router.post('/login', function (req, res, next) {
  let un = req.body.username
  let pd = req.body.password
  if (un && pd) {
    userPojo.queryUser(un, pd, function (vals) {
      if (vals && vals.length > 0) {
        let tokenD = tokenUtil.createTokenReturn(vals[0])
        res.json(outJson(tokenD, 1, '登陆成功!'));
      } else {
        res.json(outJson({}, 0, '账号或者密码有误!'));
      }
    }, function () {
      res.json(outJson({}, 0, '账号或者密码有误!'));
    })
  } else {
    res.json(outJson({}, 0, '账号或者密码有误!'));
  }
});

/* GET home page. */
router.get('/userInfo', function (req, res, next) {
  let un = req.query.username
  let pd = req.query.password
  if (un && pd) {
    userPojo.queryUser(un, pd, function (vals) {
      if (vals && vals.length > 0) {
        res.json(outJson(vals[0], 0, '成功!'));
      } else {
        res.json(outJson({}, 0, '账号或者密码有误!'));
      }
    }, function () {
      res.json(outJson({}, 0, '账号或者密码有误!'));
    })
  } else {
    res.json(outJson({}, 0, '账号或者密码有误!'));
  }
});

module.exports = router;