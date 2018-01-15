import Notification from 'react-native-push-notification';

class System {

    static getLocation(resolve, reject) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve(position);
            },
            (error) => {
                reject();
            }
        );
    }

    static setAlarm(message, date, soundName) {
        Notification.localNotificationSchedule({
            message: message,
            date: date,
            soundName: soundName,
            popInitialNotification: true,
            vibrate: true,
            vibration: 2 * 1000,
            color: "blue"
        });
    }
}

export default System;