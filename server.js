var app = require('./app');
var server = app.listen(3000, function() {
  console.log(server.address());
});
