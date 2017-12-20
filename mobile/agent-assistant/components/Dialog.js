import React, { Component } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';


class Dialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        };
    }

    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    // system: true,
                    user: {
                        _id: 2,
                        name: 'Chronos',
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
                isAnimated={true}
            />
        );
    }
}

export default Dialog;