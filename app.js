'use strict';

const compression = require('compression');
const config = require('config');
const enforcesSsl = require('express-enforces-ssl');
const express = require('express');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

mongoose.Promise = Promise;

const router = require('./lib/router');

const app = express();

// db connection
mongoose.connection.on('error', err => {
  throw err;
});
mongoose.connect(config.mongodb);
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    process.exit(0); // eslint-disable-line no-process-exit
  });
});

// start twtw
require('./lib/twtw');

app.set('trust proxy', true);
app.set('x-powered-by', false);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

if (app.get('env') === 'production') {
  app.use(enforcesSsl());
}
app.use(helmet());
app.use(compression());
app.use(favicon(path.join(__dirname, '/public/favicon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    err.status = err.status || 500;
    res.status(err.status);
    res.send(err.stack);
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  err.status = err.status || 500;
  res.status(err.status);
  res.send(err.message);
});


module.exports = app;
