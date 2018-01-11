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
            weather: "",
        };
        console.log("Dialog Constructor : "+this.weather);
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

    onSend(messages = []) {
        messages.forEach(message => {
            this.props.onSend(message.text);
        });
    }

    render() {
        return (
            <GiftedChat
                messages={this.props.messages}
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