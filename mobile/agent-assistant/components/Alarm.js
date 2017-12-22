import React, { Component } from 'react';
import ReactNativeAN from 'react-native-alarm-notification';

const alarmNotifData = {
    id: "12345",                                  // Required
    title: "My Notification Title",               // Required
    message: "My Notification Message",           // Required
    ticker: "My Notification Ticker",
    auto_cancel: true,                            // default: true
    vibrate: true,
    vibration: 100,                               // default: 100, no vibration if vibrate: false
    small_icon: "ic_launcher",                    // Required
    large_icon: "ic_launcher",
    play_sound: true,
    sound_name: null,                             // Plays custom notification ringtone if sound_name: null
    color: "red",
    schedule_once: true,                          // Works with ReactNativeAN.scheduleAlarm so alarm fires once
    tag: 'some_tag',
    fire_date: "23-12-2017 00:00:00"              // Date for firing alarm, Required for ReactNativeAN.scheduleAlarm. Format: dd-MM-yyyy HH:mm:ss
};

export default class Alarm extends Component{

  constructor(props){
    super(props)
    ReactNativeAN.scheduleAlarm(alarmNotifData);
    ReactNativeAN.getScheduledAlarms().then(alarmNotif=>console.log(alarmNotif));
  }

  render(){
    return(
      <h1>hi</h1>
    )
  }

}
