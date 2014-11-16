var questions = require('../../server/questions')();

var startAppServer = function(done) {
  if (process.env.URL) {
    return done(process.env.URL);
  }

  var app = require('../../app');
  
  var resourceController = require('../../server/resourceController');
  resourceController(app, '/api/questions', questions);

  var server = app.listen(0, function() {
    var port = server.address().port;
    done("http://localhost:" + port + "/");
  });
};

exports.startServer = startAppServer;
exports.questions = questions;
