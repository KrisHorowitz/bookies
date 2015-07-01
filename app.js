var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var config = require('./config');

app.use(bodyParser.json());

require('./router/main')(app);
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));

module.exports = app;