var conf = require("./conf");
var request = require('request')
var sessionId = "b79769f7-785a-4f3c-99ac-53a1061a292b"
var timezone = "Europe/Paris"
var lang = "fr"
var base = "https://api.dialogflow.com/v1/query"

exports.sayHi = function(req, res) {
  res.send('Hello World!')
};

exports.bravoNils = function(req, res) {
  var query = req.params.query;
  var endpoint = `${base}?query=${query}&lang=${lang}&sessionId=${sessionId}&timezone=${timezone}`
  request.get(endpoint, {'auth': {'bearer': conf.token}}, function(error,response,body){
      res.send(JSON.parse(body).result.speech)
  });
};
