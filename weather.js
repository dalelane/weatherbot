var request = require('request-promise');

function requestWeatherInfo (apiKey, lat, lon) {
    return request({
        uri : 'https://api.darksky.net/forecast/' + apiKey + '/' + lat + ',' + lon,
        method : 'GET',
        qs : {
            exclude : 'currently,minutely,daily,flags',
            units : 'si'
        },
        json : true
    });
}

function parseWeatherInfo (info) {
    var highestRainChance = 0;
    var highestTemperature = Number.NEGATIVE_INFINITY;

    var hoursLeftInDay = 24 - (new Date()).getHours();
    var hourlyPredictions = Math.min(hoursLeftInDay, info.hourly.data.length);

    for (var i = 0; i < hourlyPredictions; i++) {
        var hourlyPrediction = info.hourly.data[i];

        var chanceOfRain = Math.round(hourlyPrediction.precipProbability * 100);
        highestRainChance = Math.max(highestRainChance, chanceOfRain);

        highestTemperature = Math.max(hourlyPrediction.apparentTemperature, highestTemperature);
    }

    return {
        summary : info.hourly.summary,
        temperature : highestTemperature,
        chanceOfRain : highestRainChance
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
