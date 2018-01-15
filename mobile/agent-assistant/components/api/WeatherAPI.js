import System from '../tools/System';
const config = require("../config/config.js");

DEFAULT_WEATHER = "Clear";

class WeatherAPI {
    constructor() {
    }

    buildOpenWeatherMapURI(longitude, latitude, apiKey) {
        let uri = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&`+
               `lon=${longitude}&APPID=${apiKey}`;
        return uri;
    }

    async getWeatherInfos(latitude, longitude) {
        try {
            let uri = this.buildOpenWeatherMapURI(longitude, latitude, config.apiKey);
            let response = await fetch(uri);
            let responseJson = await response.json();
            var weathers = responseJson.weather;
            return weathers;
        } catch(error) {
            console.error(error);
        }
    }

    getWeather(resolve) {
        var self = this;
        System.getLocation(
            function (position) {
                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;
                self.getWeatherInfos(latitude, longitude).then(weathers => {
                    var weatherIDs = [];
                    weathers.forEach(function(weather){
                        weatherIDs.push(weather.id);
                    });
                    console.log("WEATHER : " + self.getWeatherGlobal(weatherIDs));
                    resolve(self.getWeatherGlobal(weatherIDs));
                }).catch( e => {
                    console.log(e);
                    resolve(DEFAULT_WEATHER);                    
                });
            },
            function () {
                resolve(DEFAULT_WEATHER);
            } 
        );
    }

    getWeatherGlobal(weatherIDs) {
        for (let weatherID of weatherIDs) {
            if (this.idBeginsWith(weatherID, "2")) {
                return "Thunderstorm";
            } else if (this.idBeginsWith(weatherID, "5")) {
                return "Rain";
            } else if (this.idBeginsWith(weatherID, "6")) {
                return "Snow";
            } else if (this.idBeginsWith(weatherID, "3")) {
                return "Drizzle";
            } else if (this.idBeginsWith(weatherID, "8") && weatherID != 800) {
                return "Clouds";
            } else if (this.idBeginsWith(weatherID, "90")) {
                return "Thunderstorm";
            } else {
                return DEFAULT_WEATHER;
            }
        }
    }

    idBeginsWith(id, first_digit){
        var strID = id.toString();
        if (strID.startsWith(first_digit))
            return true;
        else
            return false;
    }
}

export default WeatherAPI;