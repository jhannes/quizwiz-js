var startAppServer = function(done) {
  if (process.env.URL) {
    return done(process.env.URL);
  }

  var app = require('../../app');
  var server = app.listen(0, function() {
    var port = server.address().port;
    done("http://localhost:" + port + "/");
  });
};

exports.startServer = startAppServer;
