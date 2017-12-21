const conf = require("./conf");
const DialogFlow = require("./dialogFlow");
var dialogflow = new DialogFlow.DialogFlow(conf.token,"Europe/Paris","fr");
const intent_list = ["mettre_alarme","salut"];

function confirmQuery(params){
  for (param in params){
    if (params[param] === "")
      return false;
  }
  return true;
}

function getDialogResponse(sessionId,text,confirm){
  return {
    sessionId: sessionId,
    type: "text",
    text: text,
    confirm: confirm,
    error: false
  }
}

function sendQueryToDialogFlow(text,sessionId,response){
  dialogflow.sendQuery(text,sessionId)
    .then(function(e){
      const results = e.result;
      response.send(getDialogResponse(sessionId,results.speech,confirmQuery(results.parameters)));
    })
    .catch(function (err) {
        response.send({error: true});
        console.log(err);
    });
}

exports.createDialogFlow = function(req, res){
  const sessionId = dialogflow.createNewSessionId();
  sendQueryToDialogFlow(req.body.text,sessionId,res);
}

exports.queryDialogFlow = function(req, res) {
  const sessionId = req.params.id;
  sendQueryToDialogFlow(req.body.text,sessionId,res);
};

exports.confirmDialogFlow = function(req, res) {
  const sessionId = req.params.id;
  const confirm = req.params.value;
  //sendQueryToDialogFlow(req.body.text,sessionId,res);
};
