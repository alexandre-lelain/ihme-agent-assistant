import React, { Component } from 'react';
import {StyleSheet, TextInput, View, ScrollView} from 'react-native';
import Dialog from './Dialog';

class Agent extends Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     text: ""
        // };
    }

    // updateText(text) {
    //     this.setState({
    //         text
    //     });
    // }

    render() {
        return (
            <Dialog/>
        );
    }
}

// const styles = StyleSheet.create({
//     input: {
//       flex: 1
//     },
//   });

export default Agent;
