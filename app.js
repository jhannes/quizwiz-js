var express = require('express');

var app = express();

app.use(express.static('public'));
app.use('/vendor', express.static('bower_components'));

module.exports = app;
