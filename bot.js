/*
 * Weatherbot
 *
 *   A program for our TJBot.
 *
 *    It lets the TJBot tell us a weather forecast at a glance.
 *
 *    1)
 *    The arm tells us what the temperature will be:
 *          the arm turned to the left means it will be cold (0 degrees C will be all the way left)
 *          the arm turned to the right means it will be hot (30 degrees C will be all the way right)
 *          the arm pointing straight up means warm (15 degrees C)
 *    2)
 *    The light on his head tells us if it will rain.
 *          'on' means the chance of rain is greater than 50%
 *
 *  by Dale & Grace
 */

// We need this to wait for the program to finish
var sleep = require('sleep').sleep;

// Dale's code to get a weather forecast
var weather = require('./weather');

// Gets the library to control the TJBot
var tjbot = require ('tjbot');
var hardware = ['led', 'servo'];
var config = { log : { level : 'verbose' }};
var tj = new tjbot (hardware, config, {});



// lowest possible temperature
var TEMPERATURE_LOW = 0;
// highest possible temperature
var TEMPERATURE_HIGH = 30;

// where do we want the weather for?
var LATITUDE = 50.9951466;
var LONGITUDE = -1.3519566;



/*
 * Converts temperatures in the range 0 - 30 (degrees Celsius)
 *  into a position to put TJ's arm into.
 *
 * TJBot's arm moves in a range from
 *   _SERVO_ARM_DOWN (2300) to _SERVO_ARM_BACK (500)
 *
 * So this function is essentially doing an overcomplicated
 *   armposition = (-60 * temperature) + 2300;
 *
 *  using constants from the TJBot library to work that equation
 *   out from first principles for no reason.
 */
function getArmPosition (temperature) {
    var armRange = tj._SERVO_ARM_DOWN - tj._SERVO_ARM_BACK;
    var tempRange = TEMPERATURE_LOW - TEMPERATURE_HIGH;

    var convertFactor = armRange / tempRange;

    var armPosition = (convertFactor * temperature) + tj._SERVO_ARM_DOWN;

    return Math.round(armPosition);
}


// get the current weather forecast for home!
weather.getWeather(LATITUDE, LONGITUDE)
    .then(function (info) {
        // weather info should look like this:
        //
        //    info.summary == "description of the weather"
        //    info.temperature == degrees-celsius
        //    info.chanceOfRain == percentage chance of rain


        //
        // Move TJBot's arm to a position to show the forecasted temperature
        //

        // restrict temperatures to a range we can use
        if (info.temperature < TEMPERATURE_LOW) {
            info.temperature = TEMPERATURE_LOW;
        }
        if (info.temperature > TEMPERATURE_HIGH) {
            info.temperature = TEMPERATURE_HIGH;
        }

        var armPosition = getArmPosition(info.temperature);
        tj._motor.servoWrite(armPosition);


        //
        // Turn on TJBot's light if the forecast predicts rain
        //

        tj.shine(info.chanceOfRain >= 50 ? 'on' : 'off');


        // wait before exiting
        //  (in case TJBot is still moving his arm)
        sleep(2);
    });
