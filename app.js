var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var tokenOp = require('./utils/token')
var outJson = require("./utils/outJson");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var uploadFile = require('./routes/uploads/fileUpload');
var _main = require('./routes/main/main')
var _queryMain = require('./routes/main/query')
var _login = require('./routes/oauth2/login')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/fileUpload', uploadFile);
app.use(function (req, res, next) {
  // 解析用户请求的路径
  var arr = req.url.split('/');
  // 去除 GET 请求路径上携带的参数
  for (var i = 0, length = arr.length; i < length; i++) {
    arr[i] = arr[i].split('?')[0];
  }
  // 判断请求路径是否为根、登录、注册、登出，如果是不做拦截
  if (arr.length > 1 && arr[1] == '') {
    next();
  } else if (arr.length > 2 && arr[1] == 'oauth2') {
    next();
  } else { // 登录拦截
    next()
    // let authToken = req.body.authToken || req.query.authToken
    // if (authToken && tokenOp.checkToken(authToken)) {
    //   req.query['userInfo'] = tokenOp.decodeToken(authToken).payload.data
    //   next();
    // } else {
    //   res.locals.message = '访问由于凭据无效被拒绝';
    //   res.status(401);
    //   res.json(outJson({}, 401, '访问由于凭据无效被拒绝!'));
    // }
  }
})
// login token
app.use('/oauth2', _login)
// 需要token验证的接口
app.use('/main', _main)
app.use('/main/query', _queryMain)
// app.use('/auth', )
// 不需要token验证的接口

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;