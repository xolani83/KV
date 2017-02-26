const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://xolani:2005@ds159387.mlab.com:59387/vocab');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const server = app.listen(8090, function(){
  console.log("app running on http://127.0.0.1:8090 ");
})
