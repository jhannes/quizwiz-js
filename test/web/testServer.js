var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.DATABASE_TEST_URL || 
    "postgres://quizwiz:quizwiz@localhost:5432/quizwiz_test",
    {logging: false});

var questions = require('../../server/questions')(sequelize);

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
