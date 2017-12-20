const express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes');
var app = express();
app.use(bodyParser.json());

routes(app);

app.listen(3000, function () {
  console.log('Chronos app listening on port 3000!')
})
