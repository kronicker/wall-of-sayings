'use strict';

//require needed dependencies
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const HTTPStatus = require('http-status');
const app = express();
mongoose.Promise = require('bluebird');

const mongoUri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
mongoose.connect(mongoUri, {
  user: process.env.DB_USER,
  pass: process.env.DB_PASSWORD,
  config: { autoIndex: false }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mongoose.connection;
db.on('error', e => console.error('connection error:', e));
db.once('open', () => console.log('connection established', mongoUri));

app.use(express.static(__dirname + '/public'));

// create route for '/' and render the 'index.js.ejs' file to the browser
app.get('/', function (req, res) {
  res.render('index');
});

// add api routes
require('./api')(app);

// global error handler
app.use((err, req, res, next) => {
  res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
});

//set port
let port = process.env.PORT || 8080;

// tell the app to listen on specified port
app.listen(port);
console.log('Server running on port: ' + port);
