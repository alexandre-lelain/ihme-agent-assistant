const config = require("./config/config.js");
// config.apiKey 

class Weather {
    constructor(longitude, latitude) {
        this.longitude = longitude;
        this.latitude = latitude;
    }

    buildOpenWeatherMapURI(longitude, latitude, apiKey) {
        let uri = `http://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&`+
               `lon=${this.longitude}&APPID=${apiKey}`;
        return uri;
    }

    async getWeatherInfos() {
        try {
            let uri = this.buildOpenWeatherMapURI(this.longitude, this.latitude, config.apiKey);
            let response = await fetch(uri);
            let responseJson = await response.json();
            var weathers = responseJson.weather;
            return weathers;
        } catch(error) {
            console.error(error);
        }
    }

    getWeather(){
        var weatherName = "";
        this.getWeatherInfos().then(weathers => {
            var weatherIDs = [];
            weathers.forEach(function(weather){
                weatherIDs.push(weather.id);
            });
            console.log("WEATHER : " + this.getWeatherGlobal(weatherIDs));
            weatherName = this.getWeatherGlobal(weatherIDs);
        }).catch( e => {
            console.log(e)
        });

        return weatherName;
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
                return "Extreme";
            } else {
                return "Clear";
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

export default Weather;