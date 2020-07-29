const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.databaseLink);
let db = mongoose.connection;
var app = express();
app.use(express.json());

app.get('/test', function(req, res) {
    res.send({result: 'Hello world!'});
})

app.listen(3000, function() {
    console.log('The server is running on port 3000');
});
