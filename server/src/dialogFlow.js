const request = require('request');
const rp = require('request-promise');
const uuidv1 = require('uuid/v1');
"use strict";

exports.DialogFlow = class {

  constructor(bearerToken,timezone,lang){
    this.bearerToken = bearerToken;
    this.timezone = timezone;
    this.lang = lang;
    this.base = "https://api.dialogflow.com/v1/query";
  }

  createNewSessionId(){
    return uuidv1();
  }

  buildEndpoint(query,sessionId){
    return `${this.base}?query=${query}&lang=${this.lang}&sessionId=${sessionId}&timezone=${this.timezone}`
  }

  buildOptions(query,sessionId){
    return {
      uri: this.buildEndpoint(query,sessionId),
      auth: {
        'bearer': this.bearerToken
      },
      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true
    }
  }

  sendQuery(query,sessionId){
    const options = this.buildOptions(query,sessionId);
    return rp(options);
  }

}
