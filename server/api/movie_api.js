var querystring = require('querystring');
const request = require('superagent');


async function movieGetInfo() {
    var Query = querystring.stringify({
        api_key:'a010d04132a16ddae5be35904ad5f93e',
        sort_by:'popularity.desc'
      });
    var URL = "https://api.themoviedb.org/3/discover/movie?"+ Query;
    var data
    console.log(URL)
    await request
    .get(URL)
    .set('Accept', 'application/json')
    .then(function(result) {
        data = result.body;
        console.log("data:"+data);
        data["results"] = data["results"][0]
        return data
    })
    .catch(function(err) {
       console.log("Error:"+err.message)
    });
    return data
}

exports.movieGetInfo = movieGetInfo