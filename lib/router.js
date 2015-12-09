'use strict';

const express = require('express');
const hljs = require('highlight.js');

const Log = require('./log');
const pkg = require('../package.json');

const getLog = () => Log.findOne({}).lean().exec().then(log => JSON.parse(log.log));
const router = express.Router();

router.get('/', (req, res, next) => {
  getLog().then(log => {
    res.render('index', {
      site: pkg,
      page: {
        status: log.status,
        statusText: log.status === '\u2713' ? 'success' : 'danger',
        message: log.message,
        log: hljs.highlight('json', JSON.stringify(log, null, '  '), true).value
      }
    });
  }).catch(err => next(err));
});

module.exports = router;
