const express = require('express');

var app = express();
app.use(express.json());

app.get('/test', function(req, res) {
    res.send({result: 'Hello world!'});
})

app.listen(3000, function() {
    console.log('The server is running on port 3000');
});
