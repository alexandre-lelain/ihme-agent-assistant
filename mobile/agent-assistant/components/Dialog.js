import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, TextInput, Dimensions } from 'react-native';
import "moment";
import "moment/locale/fr";
import { GiftedChat, Composer, Send, Message } from 'react-native-gifted-chat';
import Weather from './Weather';

var {height, width} = Dimensions.get('window');

class Dialog extends Component {

    constructor(props) {
        super(props);

        this.weatherManager = new Weather(49.5339, 0.34061);
        // this.weather = this.weatherManager.getWeather();
        this.state = {
            messages: [],
            weather: "",
        };
        this.msgCount = this.state.messages.length;
        console.log("Constructor : "+this.weather);
    }

    addAgentEntry(newMessage) {
        console.log("addAgentEntry : " + newMessage);
        this.msgCount++;
        var message = {
            _id: this.msgCount,
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

    addUserEntry(newMessage) {
        console.log("addUserEntry : " + newMessage);
        this.msgCount++;
        var message = {
            _id: this.msgCount,
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
        this.props.onAddUserEntry(newMessage);
    }

    renderComposer(props) {
        return (
            <Composer {...props} placeholder='Écrivez un message ici...' />
        );
    }

    renderSend(props) {
        return (
            <Send {...props} label="Envoyer"/>
        );
    }
    
    componentWillMount() {
        this.addAgentEntry("Hola");
        this.addUserEntry("Hey");
    }

    componentWillUpdate(nextProps) {
        if (nextProps.newAgentMessage) {
            this.addAgentEntry(nextProps.newAgentMessage);
        }
    }

    onSend(messages = []) {
        messages.forEach(message => {
            this.addUserEntry(message.text);
        });
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={(messages) => this.onSend(messages)}
                user={{
                    _id: 1,
                }}
                locale="fr"
                isAnimated={true}
                renderComposer={this.renderComposer}
                renderSend={this.renderSend}
            />
        );
    }
}

export default Dialog;