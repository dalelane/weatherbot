# weatherbot

![Image of TJBot](https://c1.staticflickr.com/3/2916/34223524245_f6640b60a2_b.jpg)

weatherbot is a simple app that lets us use our TJBot as an ambient weather device. 

It gives us an at-a-glance weather forecast using it's head LED and the position of it's arm. We're using [DarkSky's API](https://darksky.net/) to get a weather forecast. 

## Will it rain?

![Image of TJBot with his LED turned on](https://c1.staticflickr.com/5/4171/34066175122_10e664f99a_c.jpg)

If the chance of rain is 50% or higher, the LED on weatherbot's head will light up. 

So a glance at weatherbot means we know to take an umbrella with us if we're going out.

## How warm will it be?

![Image of TJBot with his LED turned on](https://c1.staticflickr.com/3/2849/33412503893_662d30fbea_c.jpg)

The arm will rotate to show a predicted temperature. 

Rotating to the left means cold, with the arm horizontal and all the way to the front meaning 0 degrees C or colder. 

Rotating to the right means hot, with the arm horizontal and all the way to the back meaning 30 degrees C or hotter. 

And the arm pointing straight up is half-way between the two: 15 degrees C. 

So a glance at weatherbot means we know if we should take a coat. 

## Running weatherbot

The script sets the arm and LED once. 

We're using `cron` to run the script every 5 minutes, so the weatherbot keeps up to date with the latest forecast.

## Erm... isn't this a bit simple?

Yes. The TJBot was [built by my kids](https://twitter.com/dalelane/status/852942709698560000) and this is their first project. 

Faith came up with the idea and Grace wrote [bot.js](https://github.com/dalelane/weatherbot/blob/master/bot.js) with a few suggestions and additional commenting from me. The idea was to let them use the bot to build something they could understand and make themselves, without me interfering too much. 

For our next project, we might try something a little more advanced! :-) 

-- Dale ( [@dalelane](http://twitter.com/dalelane) )
