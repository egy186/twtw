var express = require('express');
var router = express.Router();

var api = require('../api');
var pkg = require('../package.json');

router.get('/', function (req, res) {
  var log = api.log();

  res.render('index', {
    site: pkg,
    page: {
      log: log
    }
  });
});

module.exports = router;
