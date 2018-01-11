import React, { Component } from 'react';
import {StyleSheet, TextInput, View, ScrollView} from 'react-native';
import Dialog from './Dialog';
import AgentAPI from './api/AgentAPI';
import { GiftedChat } from 'react-native-gifted-chat';


class Agent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
        this.manageUserEntry= this.manageUserEntry.bind(this);
        this.addUserEntry= this.addUserEntry.bind(this);        
    }

    manageUserEntry(message) {
        var self = this;
        console.log("manageUserEntry : " + message);
        if (!self.sessionId) {
            // creer dialogue
            console.log("manageUserEntry : pas encore de session");
            AgentAPI.createDialog(message, function (data) {
                self.sessionId = data.sessionId;
                console.log("Dialog created with sessionId : " + self.sessionId);
                console.log(data.text);
                self.addAgentEntry(data.text);
                // if (data.confirm && data.confirm === "true") {

                // } else if (data.confirm && data.confirm === "false") {

                // }
            },
            function () {
                console.log("Could not create dialog");
            });
        } else {
            // envoyer nouvelle entree
            console.log("manageUserEntry : une session existe deja");
        }
    }

    addUserEntry(newMessage) {
        console.log("addUserEntry : " + newMessage);
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
        console.log("before onAddUserEntry");
        this.manageUserEntry(newMessage);
    }

    addAgentEntry(newMessage) {
        console.log("addAgentEntry : " + newMessage);
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

    render() {
        return (
            <Dialog onSend={this.addUserEntry} messages={this.state.messages} />
        );
    }
}

// const styles = StyleSheet.create({
//     input: {
//       flex: 1
//     },
//   });

export default Agent;