var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var pkg = require('./package.json');
var routes = require('./routes/index');
var twtwStatus = require('./routes/status');

var app = express();

// start twtw
require('./twtw');

app.set('x-powered-by', false);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// redirect to HTTPS
if (app.get('env') === 'production') {
  app.use(function (req, res, next) {
    res.set('strict-transport-security', 'max-age=63072000');
    if (req.headers['x-forwarded-proto'] === 'http') {
      res.redirect(301, 'https://' + req.headers.host + req.originalUrl);
    } else {
      next();
    }
  });
}

app.use('/', routes);
app.use('/status', twtwStatus);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
/* jshint -W098 */
  app.use(function(err, req, res, next) {
/* jshint +W098 */
    err.status = err.status || 500;
    res.status(err.status);
    res.render('error', {
      site: pkg,
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
/* jshint -W098 */
app.use(function(err, req, res, next) {
/* jshint +W098 */
  err.status = err.status || 500;
  res.status(err.status);
  res.render('error', {
    site: pkg,
    message: err.message,
    error: {
      status: err.status
    }
  });
});


module.exports = app;
