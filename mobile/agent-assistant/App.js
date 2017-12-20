import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, KeyboardAvoidingView } from 'react-native';
import Agent from './components/Agent';


export default class App extends Component {

  constructor(props){
    super(props);
    // this.state = {
    //   reponse: ""
    // }
  }

//   async sayHi() {
//     try {
//       let response = await fetch('http://asi-17-ihme.insa-rouen.fr/say-hi');
//       let responseJson = await response.json();
//       this.setState({reponse:responseJson.response});
//     } catch(error) {
//       console.error(error);
//     }
//   }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {/* <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Button title="Say Hi !" onPress={this.sayHi.bind(this)}/>
        <Text>{this.state.reponse}</Text> */}
        <Agent/>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
