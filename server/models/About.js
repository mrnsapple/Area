

function getClientAddress(req) {
    return req.ip.split(':').pop()
}

function getEpochInt() {
    var epoch = Date.now()
    epoch /= 1000
    var epochInt = parseInt(epoch)
    return (epochInt)
}

async function getAbout(req, res, next) {
    var epoch = getEpochInt()

    if (req === undefined || req.ip === undefined)
        req = { ip: "client host" };
    return {
        client: {
            host: getClientAddress(req)
        },
        server: {
            current_time: epoch,
            services: [{
                "name": "Github",
                "actions": [{
                    "name" : "Name",
                    "description": "Github user name has been changed"
                }, {
                    "name" : "Email",
                    "description": "Github user email has been changed"
                },{
                    "name" : "Blog",
                    "description": "Github user blog name has been changed"
                },{
                    "name" : "Company",
                    "description": "Github user company name has been changed"
                },{
                    "name" : "Location",
                    "description": "Github user location has been changed"
                },{
                    "name" : "Hireable",
                    "description": "Github user hireable has been changed"
                },{
                    "name" : "Bio",
                    "description": "Github user bio has been changed"
                }],
                "reactions": [{
                    "name" : "Name",
                    "description": "The user change his github name"
                }, {
                    "name" : "Email",
                    "description": "The user change his github email"
                },{
                    "name" : "Blog",
                    "description": "The user change his github blog"
                },{
                    "name" : "Company",
                    "description": "The user change his github company"
                },{
                    "name" : "Location",
                    "description": "The user change his github location"                
                },{
                    "name" : "Hireable",
                    "description": "The user change his github hireable"
                },{
                    "name" : "Bio",
                    "description": "The user change his github bio"
                }]
            },{
                "name": "Movie",
                "actions": [{
                    "name" : "Original Title",
                    "description": "Most popular current movie name has been changed"
                }, {
                    "name" : "Popularity",
                    "description": "Most popular current movie popularity amount has been changed"
                },{
                    "name" : "Release Date",
                    "description": "Most popular current movie release date has been changed"
                },{
                    "name" : "Vote Avarage",
                    "description": "Most popular current movie vote avarage has been changed"
                },{
                    "name" : "Location",
                    "description": "Most popular current movie location has been changed"
                }]
            }, {
                "name": "OpenWeather",
                "actions": [{
                    "name" : "Temperature",
                    "description": "City temperature has changed"
                },{
                    "name" : "Preasure",
                    "description": "City preasure has changed"
                },{
                    "name" : "Humidity",
                    "description": "City humidity has changed"
                },{
                    "name" : "Wind_Speed",
                    "description": "City wind speed has changed"
                },{
                    "name" : "Wind_Direction",
                    "description": "City wind direction has changed"
                },{
                    "name" : "Clouds",
                    "description": "City clouds number has changed"
                }],
                "reactions": [
                ]
            }, {
                "name": "Timer",
                "actions": [{
                    "name" : "Date",
                    "description": "Let you trigger an action on a specific date"
                },{
                    "name" : "Day of the week",
                    "description": "Let you trigger an action on a specific day of the week"
                },{
                    "name" : "Time",
                    "description": "Let you trigger an action at specific time"
                },{
                    "name" : "Step",
                    "description": "Let you trigger a reaction by steps of X seconds, minutes or hours"
                }],
                "reactions": [
                ]
            }, {
                "name": "Mail",
                "actions": [
                ],
                "reactions": [{
                    "name": "Send a mail",
                    "description": "Let you send a mail to anybody with the subject and the content of your choice"
                }]
            }]
        }
    }
};

module.exports.sendAbout = async function (req, res) {
    res.json(await getAbout(req));
};
