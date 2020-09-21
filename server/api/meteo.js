var querystring = require('querystring');
const request = require('superagent');


async function meteoGetInfo(city) {
    console.log("City:" + city)    
    var openWeatherMapQuery = querystring.stringify({
        q: city,
        lang: "fr",
        units: "metric",
        APPID:'900d3e9ae4becf34764a9b7d1ff687aa'
      });
    var openWeatherMapURL = "http://api.openweathermap.org/data/2.5/weather?"+ openWeatherMapQuery;
    var data
    console.log(openWeatherMapURL)
    await request
    .get(openWeatherMapURL)
    .set('Accept', 'application/json')
    .then(function(result) {
        data = result.body;
        return data
    })
    .catch(function(err) {
       console.log("Error:"+err.message)
    });
    return data
}

exports.meteoGetInfo = meteoGetInfo