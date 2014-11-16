var app = require('./app');

var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.DATABASE_URL || 
    "postgres://quizwiz:quizwiz@localhost:5432/quizwiz_dev",
    {logging: false});

var migrations = __dirname + "/migrations/";
sequelize.getMigrator({path: migrations}).migrate().done(function() {
  var resourceController = require('./server/resourceController');
  resourceController(app, '/api/questions', require('./server/questions')(sequelize));

  var server = app.listen(process.env.PORT || 3000, function() {
    console.log(server.address());
  });
});

