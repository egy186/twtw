var express = require('express');
var router = express.Router();

var api = require('../api');

router.get('/', function (req, res) {
  var log = api.log();

  delete log.twtwLog;
  delete log.statusText;

  res.json(log);
});

module.exports = router;
