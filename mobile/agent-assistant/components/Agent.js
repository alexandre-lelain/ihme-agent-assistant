import React, { Component } from 'react';
import {StyleSheet, TextInput, View, ScrollView} from 'react-native';
import Dialog from './Dialog';
import AgentAPI from './api/AgentAPI';

class Agent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newAgentMessage: ''
        };
        this.manageUserEntry= this.manageUserEntry.bind(this);
    }

    // updateText(text) {
    //     this.setState({
    //         text
    //     });
    // }

    manageUserEntry(message) {
        var self = this;
        console.log("manageUserEntry : " + message);
        if (!self.sessionId) {
            // creer dialogue
            console.log("manageUserEntry : cas 1");
            AgentAPI.createDialog(message, function (data) {
                self.sessionId = data.sessionId;
                console.log("Dialog created with sessionId : " + self.sessionId);
                console.log(data.text);
                // self.setState({
                //     newAgentMessage: data.text
                // });
            },
            function () {
                console.log("Could not create dialog");
            });
        } else {
            // envoyer nouvelle entree
            console.log("manageUserEntry : cas 2");
        }
    }

    render() {
        return (
            <Dialog onAddUserEntry={this.manageUserEntry} newAgentMessage={this.state.newAgentMessage} />
        );
    }
}

// const styles = StyleSheet.create({
//     input: {
//       flex: 1
//     },
//   });

export default Agent;