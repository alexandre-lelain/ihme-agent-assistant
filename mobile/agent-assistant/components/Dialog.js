import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, TextInput, Dimensions, Image } from 'react-native';
import "moment";
import "moment/locale/fr";
import { GiftedChat, Composer, Send, Message, Actions } from 'react-native-gifted-chat';
import Weather from './Weather';
import mic from "./images/mic.png";

var {height, width} = Dimensions.get('window');

class Dialog extends Component {

    constructor(props) {
        super(props);

        this.weatherManager = new Weather(49.5339, 0.34061);
        // this.weather = this.weatherManager.getWeather();
        this.state = {
            weather: "",
        };
        this.getUserVoiceInput = this.getUserVoiceInput.bind(this);
        console.log("Dialog Constructor : "+this.weather);
    }

    getUserVoiceInput(){
      console.log("TOUCHE");
    }

    renderComposer(props) {
        return (
          <Composer {...props} placeholder='Écrivez un message ici...' />
        );
    }

    renderIcon(){
      return (
        <Image
          style={{width: 25, height: 25}}
          source={mic}
        />
      )
    }

    renderActions(parent){
      return(
        <Actions onPressActionButton={parent.getUserVoiceInput} icon={this.renderIcon}/>
      )
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
                renderActions={() => this.renderActions(this)}
                renderComposer={this.renderComposer}
                renderSend={this.renderSend}
            />
        );
    }
}

export default Dialog;
