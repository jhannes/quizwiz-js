var DEBUG = false;
var VERBOSE = false;

var started = false;

var startSeleniumServer = function(done) {
  if (started) done();

  var selenium = require('selenium-standalone');
  var server = selenium({ stdio: 'pipe' },
    [DEBUG ? "-debug" : ""]
  );
  server.stdout.setEncoding("utf8");
  server.stdout.on('data', function(output) {
    if (VERBOSE) console.log(output);
    if (!started) {
      started = true;
      done();
    }
  });
};


var startWebDriver = function(done) {
  var client = require('webdriverio').remote({
    desiredCapabilities: desiredCapabilities(),
    logLevel: (DEBUG ? "debug" : "")
  });
  patchPhantomJsClient(client);
  client.init(done);
  return client;
}

var desiredCapabilities = function() {
  var desiredCapabilities = {
    browserName: process.env.BROWSER || 'phantomjs',
  };
  if (desiredCapabilities.browserName === "phantomjs") {
    if (/^win/.test(process.platform)) {
      // Selenium 2.42.0 bug:
      //  Selenium tries to execute phantomjs instead of phantomjs.cmd on Windows
      desiredCapabilities["phantomjs.binary.path"] = __dirname + "/../../node_modules/.bin/phantomjs.cmd";
    }
  }
  return desiredCapabilities;
}

var patchPhantomJsClient = function(client) {
  if (process.env.LINGER) {
    client.end = function(done) { setTimeout(done, 200); };
    return;
  }
  if (desiredCapabilities().browserName === "phantomjs") {
    // PhantomJs 1.9.7-8 bug:
    //   end doesn't call back
    client.oldEnd = client.end;
    client.end = function(done) {
      this.oldEnd();
      setTimeout(done, 200);
    };
  }
}


exports.startWebDriver = startWebDriver;
exports.startSeleniumServer = startSeleniumServer
