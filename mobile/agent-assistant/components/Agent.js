import React, { Component } from 'react';
import {StyleSheet, TextInput, View, ScrollView, Alert} from 'react-native';
import Dialog from './Dialog';
import Tts from 'react-native-tts';
import AgentAPI from './api/AgentAPI';
import { GiftedChat } from 'react-native-gifted-chat';
import WeatherAPI from './api/WeatherAPI';
import DateTools from './tools/DateTools';
import System from './tools/System';

class Agent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        };
        this.manageUserEntry = this.manageUserEntry.bind(this);
        this.addUserEntry = this.addUserEntry.bind(this);
        Tts.setDefaultLanguage('fr-FR');
        Tts.setDucking(true);
    }

    manageUserEntry(message) {
        var self = this;
        if (!self.sessionId) {
            // creer dialogue
            AgentAPI.createDialog(message, function (data) {
                self.sessionId = data.sessionId;
                self.addAgentEntry(data.text);
                if (data.confirm) {
                    self.confirm(self, data.action, data.text);
                }
            },
            function () {
                console.log("Could not create dialog");
            });
        } else {
            // envoyer nouvelle entree
            AgentAPI.addEntry(self.sessionId, message, function (data) {
                self.addAgentEntry(data.text);
                if (data.confirm) {
                    self.confirm(self, data.action, data.text);
                }
            },
            function () {
                console.log(`Could not add a message to dialog (sessionId=${self.sessionId})`);
            });
        }
    }

    confirm(parent, action, message) {
        // on a toutes les infos
        // demander confirmation : l'utilisateur doit répondre "oui"/"non"
        if (action.type === "alarm" && action.datetime) {
            parent.alarmTime = DateTools.createDateFromDialogFlow(action.datetime);
            Alert.alert(
                "Confirmation",
                message,
                [
                    {text: "Non", onPress: () => parent.manageDeclined(), style: "cancel"},
                    {text: "Oui", onPress: () => parent.manageConfirmed()},
                ],
                {cancelable: false}
            );
        }
    }

    manageConfirmed() {
        // confirmation
        // creer une alarme
        Tts.stop();
        this.createAlarm();
    }

    manageDeclined() {
        // l'utilisateur ne confirme pas la proposition d'alarme
        Tts.stop();        
        this.sessionId = undefined;
        this.addSystemMessage("Proposition d'alarme déclinée.");
        this.addAgentEntry("Très bien. Que puis-je faire pour vous ?");
    }

    addUserEntry(newMessage) {
        var message = {
            _id: this.state.messages.length,
            text: newMessage,
            createdAt: new Date(),
            user: {
                _id: 1,
                name: 'Me',
            },
        };
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, message),
        }));
        this.manageUserEntry(newMessage);
    }

    addAgentEntry(newMessage) {
        Tts.speak(newMessage);
        var message = {
            _id: this.state.messages.length,
            text: newMessage,
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'Chronos',
                avatar: require('./images/chronos.png'),
            },
        };
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, message),
        }));
    }

    addSystemMessage(newMessage) {
        var message = {
            _id: this.state.messages.length,
            text: newMessage,
            createdAt: new Date(),
            system: true,
        };
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, message),
        }));
    }

    createAlarm() {
        var self = this;
        var formattedDate = DateTools.formatDate(self.alarmTime);
        let weatherAPI = new WeatherAPI();
        weatherAPI.getWeather(function (weather) {
            self.addSystemMessage(`Création d'une alarme pour le ${formattedDate}.`);
            var soundName = `${weather.toLowerCase()}.mp3`;
            var diff = DateTools.getIntervalForNotification(self.alarmTime);
            setTimeout(function () {
                self.addSystemMessage(`Météo pour la prochaine alarme : ${weather}.`);
                System.setAlarm("Votre agent Chronos vous réveille !", self.alarmTime, soundName);
            }, diff);
        });
    }
   
    componentDidMount() {
        this.addAgentEntry("Bienvenue, je suis l'agent Chronos. Vous pouvez me demander de créer une alarme.");
    }

    render() {
        return (
            <Dialog onSend={this.addUserEntry} messages={this.state.messages} addUserEntry={this.addUserEntry.bind(this)}/>
        );
    }
}


export default Agent;
