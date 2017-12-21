import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, TextInput, Dimensions } from 'react-native';
import "moment";
import "moment/locale/fr";
import { GiftedChat, Composer, Send } from 'react-native-gifted-chat';

var {height, width} = Dimensions.get('window');

class Dialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        };
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
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Bonjour, jeune padawan',
                    createdAt: new Date(),
                    // system: true,
                    user: {
                        _id: 2,
                        name: 'Chronos',
                        avatar: require('./images/chronos.png'),
                    },
                },
            ],
        });
    }

    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
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