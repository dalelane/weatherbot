var request = require('request-promise');

function requestWeatherInfo (apiKey, lat, lon) {
    return request({
        uri : 'https://api.darksky.net/forecast/' + apiKey + '/' + lat + ',' + lon,
        method : 'GET',
        qs : {
            exclude : 'currently,minutely,hourly,flags',
            units : 'si'
        },
        json : true
    });
}

function parseWeatherInfo (info) {
    var nextPrediction = info.daily.data[0];
    return {
        summary : nextPrediction.summary,
        temperature : nextPrediction.apparentTemperatureMax,
        chanceOfRain : Math.round(nextPrediction.precipProbability * 100)
    };
}

function getWeather (lat, lon) {
    var apiKey = process.env.DARKSKY_APIKEY;
    if (!apiKey) {
        console.log('Need to set DARKSKY_APIKEY');
        throw new Error('Need to set DARKSKY_APIKEY');
    }

    return requestWeatherInfo(lat, lon)
        .then(function (response) {
            return parseWeatherInfo(response);
        });
}

module.exports = {
    getWeather
};
