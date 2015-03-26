var fs = require('fs');
var path = require('path');

var config = require('config');

var log = function () {
  var twtwLog = JSON.parse(fs.readFileSync(path.join(config.get('server.logDir'), 'twtw.log'), {
    encoding: 'utf8'
  }));

  return {
    message: twtwLog.message,
    status: twtwLog.status === 'success' ? '\u2713' : '\u2717',
    statusText: twtwLog.status === 'success' ? 'success' : 'danger',
    twtwLog: JSON.stringify(twtwLog, null, '  ')
  };
};

module.exports = {
  log: log
};
