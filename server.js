var app = require('./app');

var resourceController = require('./server/resourceController');
resourceController(app, '/api/questions', require('./server/questions')());


var server = app.listen(3000, function() {
  console.log(server.address());
});
