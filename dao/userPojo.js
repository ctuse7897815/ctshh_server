var mysqlUtil = require("../utils/mysqlUtil")

var userDao = {
  queryUser(username, password, sucCB, errorCB) {
    let qSql = "select * from user where username='" + username  + "' and password='" + password + "'"
    mysqlUtil(qSql, function (qerr,vals,fields) {
      sucCB(vals)
    }, function (error) {
      errorCB()
    })
  }
}

module.exports = userDao