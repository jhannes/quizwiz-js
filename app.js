var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

app.use(express.static('public'));
app.use('/vendor', express.static('bower_components'));


module.exports = app;
