var express = require('express');

var app = express();

app.use(express.static('public'));
app.use('/vendor', express.static('bower_components'));


var server = app.listen(3000, function() {
  console.log(server.address());
});
