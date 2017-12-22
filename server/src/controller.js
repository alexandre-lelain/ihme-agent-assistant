const conf = require("./conf");
const DialogFlow = require("./dialogFlow");
var dialogflow = new DialogFlow.DialogFlow(conf.token,"Europe/Paris","fr");

function buildDatetime(date,time){
  return `${date} ${time}`;
}

function confirmQuery(params){
  for (param in params){
    if (params[param] === "")
      return false;
  }
  return true;
}

function getDialogResponseComplete(sessionId,text,datetime){
  return {
    sessionId: sessionId,
    text: text,
    confirm: true,
    type: "action",
    action: {
      type: "alarm",
      datetime: datetime
    },
    error: false,
  }
}

function getDialogResponseUncomplete(sessionId,text){
  return {
    sessionId: sessionId,
    type: "text",
    text: text,
    confirm: false,
    error: false
  }
}

function sendQueryToDialogFlow(text,sessionId,response){
  dialogflow.sendQuery(text,sessionId)
    .then(function(e){
      const confirm = confirmQuery(e.result.parameters);
      if (confirm & e.result.action === "mettre_alarme"){
        const datetime = buildDatetime(e.result.parameters.date,e.result.parameters.time)
        response.send(getDialogResponseComplete(sessionId,e.result.speech,datetime));
      }
      else
        response.send(getDialogResponseUncomplete(sessionId,e.result.speech));
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
