var express = require('express')
var admin = require('firebase-admin')
var serviceAccount = require('./area_private_key')
var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport')
var mailAccount = require('./mail_infos')
var url = require('url')
var qs = require('query-string')
//CRON
var cors = require('cors')
var cron = require('node-cron')
//GITHUB
const github_routes = require("./routes/github_routes");
const github_api = require("./api/github_api")
//TRELLO
const trello_routes = require("./routes/trello_routes")
//DATABASE
const database_routes = require("./routes/database_routes")
const database = require("./database/database")
//ABOUT
const about_routes = require("./routes/about_routes")

var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: mailAccount.user,
      pass: mailAccount.pass
    }
}))

var app = express()
const PORT = process.env.PORT || 8080;

app.use(cors())

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://area-13e0f.firebaseio.com"
})

var actions = []
var reactions = []

for (var i = 1; i <= 5; i++) {
    getActionsReactionsByServiceID(i.toString(), 'ACTIONS')
    getActionsReactionsByServiceID(i.toString(), 'REACTIONS')
}

launchAllAreas()

async function sendMail(mailInfos) {
    var receiver = mailInfos.split('|')[0]
    var subject = mailInfos.split('|')[1]
    var message = mailInfos.split('|')[2]
    console.log("Sending email\n");
    await transporter.sendMail({
      from: mailAccount.user,
      to: receiver,
      subject: subject,
      text: message
    })
    console.log('Mail sent to ' + receiver)
}

function updateInfoAPI(param) {
    database.UpdateInfoApi(param.split('|')[0], param.split('|')[1], param.split('|')[2], param.split('|')[3])
}

async function verifyUpdate(email, service, field, callback, param, action_param) {
    try {
        cron.schedule('*/1 * * * *', async function() {
        var changed = false
        changed = await database.GetSpecificDatabaseField(email, service, field, action_param)
        console.log("has it changed?" + changed+ "\n")
        if (changed === true)
            callback(param)
        else
            return
        }, {
            scheduled: true,
            timezone: 'Europe/Paris'
        })
    }
    catch(error) {
        console.error(error);
    }
}

function getCurrentDate() {
    var date = new Date()
    var day = date.getDate()
    var month = date.getMonth() + 1
    if (day < 10)
        day = '0' + day
    if (month < 10)
        month = '0' + month
    var result = day + '/' + month
    return (result)
}

function getCurrentTime() {
    var date = new Date()
    var hours = date.getHours() + 1
    var mins = date.getMinutes()
    if (mins < 10)
        mins = '0' + mins
    if (hours < 10)
        hours = '0' + hours
    var time = hours + ':' + mins
    return (time)
}

function areaCallback(param) {
    console.log(getCurrentDate() + ' ' + getCurrentTime() + ': TRIGGERED')
}

function createAreaByTime(time, callback, param) {
    hours = time.split('|')[0]
    minutes = time.split('|')[1]
    cronExpression = minutes + ' ' + hours + ' * * *'

    cron.schedule(cronExpression, () => {
        callback(param)
    }, {
        scheduled: true,
        timezone: 'Europe/Paris'
    })
}

function createAreaByDate(date, callback, param) {
    day = date.split('|')[0]
    month = date.split('|')[1]
    cronExpression = '* * ' + day + ' ' + month + ' *'

    cron.schedule(cronExpression, () => {
        callback(param)
    }, {
        scheduled: true,
        timezone: 'Europe/Paris'
    })
}

function createAreaByDayOfWeek(day, callback, param) {
    cronExpression = '* * * * ' + day

    cron.schedule(cronExpression, () => {
        callback(param)
    }, {
        scheduled: true,
        timezone: 'Europe/Paris'
    })
}

function createAreaBySteps(step, callback, param) {
    step1 = step.split('|')[0]
    step2 = step.split('|')[1]
    cronExpression = ''

    if (step1 === 'sec')
        cronExpression = '*/' + step2 + ' * * * * *'
    else if (step1 === 'min')
        cronExpression = '*/' + step2 + ' * * * *'
    else if (step1 === 'hour')
        cronExpression = '* */' + step2 + ' * * *'

    cron.schedule(cronExpression, () => {
        callback(param)
    }, {
        scheduled: true,
        timezone: 'Europe/Paris'
    })
}

function hasUserSubscribed(userServices, id) {
    for (var i = 0; i < userServices.length; i++) {
        if (userServices.charAt(i) === id)
            return ('ok')
    }
    return ('ko')
}

function removeUserSubscription(userServices, id) {
    newServices = ''
    found = false

    for (var i = 0; i < userServices.length; i++) {
        if (userServices.charAt(i) === id) {
            found = true
        } else if (userServices.charAt(i) === ';' && found) {
            found = false
        } else {
            newServices += userServices.charAt(i)
        }
    }
    return (newServices)
}

function removeArea(areas, actionId, actionParam, reactionId, reactionParam) {
    toRemove = '[' + actionId + ':' + actionParam + '=' + reactionId + ':' + reactionParam + '];'
    areas = areas.replace(toRemove, '')

    return (areas)
}

function getActionsReactionsByServiceID(service_id, collection) {
    var values = []
    var nbLoops = 0

    admin.firestore().collection(collection).where('service_id', '==', service_id).get()
    .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
            values[nbLoops] = {
                id: documentSnapshot._fieldsProto.id.stringValue,
                name: documentSnapshot._fieldsProto.name.stringValue,
                description: documentSnapshot._fieldsProto.description.stringValue,
                parameter: documentSnapshot._fieldsProto.parameter.stringValue
            }
            nbLoops++
        })
        if (collection == 'ACTIONS') {
            actions[service_id - 1] = values
        } else {
            reactions[service_id - 1] = values
        }
    })
}

function getUserServicesSubscriptions(found, snapshot, userServices, res) {
    var entry = []

    if (found) {
        var nbLoops = 0
        snapshot.forEach(documentSnapshot => {
            id_service = parseInt(documentSnapshot._fieldsProto.id.stringValue) - 1
            entry[nbLoops] = {
                id: documentSnapshot._fieldsProto.id.stringValue,
                name: documentSnapshot._fieldsProto.name.stringValue,
                subscribed: hasUserSubscribed(userServices, documentSnapshot._fieldsProto.id.stringValue),
                description: documentSnapshot._fieldsProto.description.stringValue,
                actions: actions[id_service],
                reactions: reactions[id_service]
            }
            nbLoops++
        })
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({services: entry}))
    } else {
        res.writeHead(401, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({services: 'failed: no account exists with this email'}))
    }
}

function createUser(email, password, res) {
    admin.firestore().collection('USERS').where('email', '==', email).get()
    .then(querySnapshot => {
        if (querySnapshot.size !== 0) {
            res.writeHead(401, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({register: 'failed: email already taken'}))
        } else {
            var newUser = {
                email: email,
                password: password,
                areas: '',
                services: ''
            }
            admin.firestore().collection('USERS').add(newUser).then(function() {
                if (password !== '') {
                    res.writeHead(200, {'Content-Type': 'application/json'})
                    res.end(JSON.stringify({register: 'success'}))
                }
            })
        }
    })
}

function verifyLogin(snapshot, id, req, res) {
    if (snapshot.email.stringValue === req.params.email &&
        snapshot.password.stringValue === req.params.password) {
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({login: 'success'}))
        admin.firestore().collection('USERS').doc(id).update({online: 'true'})
    } else {
        res.writeHead(401, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({login: 'failed: incorrect email or password'}))
    }
}

function logInAndOut(req, res, mode) {
    admin.firestore().collection('USERS').where('email', '==', req.params.email).get()
    .then(querySnapshot => {
        if (querySnapshot.size === 1) {
            querySnapshot.forEach(documentSnapshot => {
                if (mode === 'login') {
                    verifyLogin(documentSnapshot._fieldsProto, documentSnapshot.id, req, res)
                } else {
                    res.writeHead(200, {'Content-Type': 'application/json'})
                    res.end(JSON.stringify({[mode]: 'success'}))
                }
            })
        } else {
            if (mode === 'oauth2') {
                createUser(req.params.email, '', res)
                res.writeHead(200, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({oauth2: 'success'}))
            } else {
                res.writeHead(401, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({[mode]: 'failed: no account exists with this email'}))
            }
        }
    })
}

function getServicesByUser(req, res) {
    var found = false
    var userServices = ''

    admin.firestore().collection('USERS').where('email', '==', req.params.email).get()
    .then(querySnapshot => {
        if (querySnapshot.size === 1) {
            found = true
            querySnapshot.forEach(documentSnapshot => {
                userServices = documentSnapshot._fieldsProto.services.stringValue
            })
        }
        admin.firestore().collection('SERVICES').get()
        .then(querySnapshot => {
            getUserServicesSubscriptions(found, querySnapshot, userServices, res)
        })
    })
}
function updateServiceInfo(res,email, service_id)
{
    try {

        console.log("__UPDATING DATA IN DATABASE OF:" + service_id + ", For user:" + email + "\n");
        url = 'http://localhost:8080/api/auth/oauth/database/update_info_database?&email=' + email
        if (service_id == 4)
            url +='&service=meteo&city=Toulouse';
        else if (service_id == 5)
            url +='&service=' + 'movie';
        else if (service_id == 2)
            url +='&service=github';
        res.redirect(url);
    }
    catch(error) {
        console.error(error);
    }
}


function servicesSubscriptionAndUnsubscription(req, res, next,  mode, expected, call) {
    var valid = false
    var snap = ''
    var services = ''
    admin.firestore().collection('USERS').where('email', '==', req.params.email).get()
    .then(querySnapshot => {
        if (querySnapshot.size === 1)
            valid = true
        querySnapshot.forEach(documentSnapshot => {
            snap = documentSnapshot
            if (hasUserSubscribed(documentSnapshot._fieldsProto.services.stringValue, req.params.service_id) === expected) {
                updateServiceInfo(res, req.params.email, req.params.service_id)
                valid = false
            }
        })
        if (valid) {
            if (mode === 'subscribe') {
                services = snap._fieldsProto.services.stringValue + req.params.service_id + ';'
                updateServiceInfo(res, req.params.email, req.params.service_id)
            }
            else
                services = removeUserSubscription(snap._fieldsProto.services.stringValue, req.params.service_id)
            admin.firestore().collection('USERS').doc(snap.id).update({services: services}).then(function() {
                res.writeHead(200, {'Content-Type' : 'application/json'})
                res.end(JSON.stringify({[mode]: 'success'}))
            })
        } else {
            res.writeHead(401, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({[mode]: 'failed'}))
        }
    })
}

function manageAreas(req, res, mode) {
    found = false
    areas = ''
    removed = ''
    snap = ''

    admin.firestore().collection('USERS').where('email', '==', req.params.email).get()
    .then(querySnapshot => {
        if (querySnapshot.size === 1)
            found = true
        querySnapshot.forEach(documentSnapshot => {
            snap = documentSnapshot
            areas = documentSnapshot._fieldsProto.areas.stringValue
            if (mode === 'area_remove') {
                removed = removeArea(areas, req.params.action_id, req.params.action_param, req.params.reaction_id, req.params.reaction_param)
                if (areas === removed) {
                    res.writeHead(401, {'Content-Type': 'application/json'})
                    res.end(JSON.stringify({[mode]: 'failed: this area does not exists'}))
                }
            }
        })
        if (found) {
            if (mode === 'area_add')
                areas += '[' + req.params.action_id + ':' + req.params.action_param + '=' + req.params.reaction_id + ':' + req.params.reaction_param + '];'
            else
                areas = removed
            admin.firestore().collection('USERS').doc(snap.id).update({areas: areas}).then(function() {
                res.writeHead(200, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({[mode]: 'success'}))
            })
        } else {
            res.writeHead(401, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({[mode]: 'failed: no account exists with this email'}))
        }
    })
}

function launchAllAreas() {
    admin.firestore().collection('USERS').get()
    .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
            var areas = documentSnapshot._fieldsProto.areas.stringValue.split(';')
            for (var i = 0; i < (areas.length - 1) && documentSnapshot._fieldsProto.areas.stringValue.length !== 0; i++) {
                action_id = areas[i].split('=')[0].split(':')[0].split('[')[1]
                action_param = areas[i].split('=')[0].split(':')[1]
                reaction_id = areas[i].split('=')[1].split(':')[0]
                reaction_param = areas[i].split('=')[1].split(':')[1].split(']')[0]
                launchArea(documentSnapshot._fieldsProto.email.stringValue, action_id, action_param, reaction_id, reaction_param)
            }
        })
    })
}

function launchArea(email, action_id, action_param, reaction_id, reaction_param)
{
    var callback
    var param = reaction_param
    github_email = "oriol.manzano@epitech.eu"
    switch (reaction_id) {
        case '1':
            callback = sendMail
            break
        case '2':
            callback = updateInfoAPI
            param = github_email + '|github|name|' + reaction_param
            break
        case '3':
            callback = updateInfoAPI
            param = github_email + '|github|email|' + reaction_param
            break
        case '4':
            callback = updateInfoAPI
            param = github_email + '|github|blog|' + reaction_param
            break
        case '5':
            callback = updateInfoAPI
            param = github_email + '|github|company|' + reaction_param
            break
        case '6':
            callback = updateInfoAPI
            param = github_email + '|github|location|' + reaction_param
            break
        case '7':
            callback = updateInfoAPI
            param = github_email + '|github|hireable|' + reaction_param
            break
        case '8':
            callback = updateInfoAPI
            param = github_email + '|github|bio|' + reaction_param
            break
        default:
            callback = areaCallback
    }
    switch (action_id) {
        case '1':
            createAreaByDate(action_param, callback, param)
            break
        case '2':
            createAreaByDayOfWeek(action_param, callback, param)
            break
        case '3':
            createAreaByTime(action_param, callback, param)
            break
        case '4':
            createAreaBySteps(action_param, callback, param)
            break
        case '5':
            verifyUpdate(email, 'github', 'name', callback, param, action_param)
            break
        case '6':
            verifyUpdate(email, 'github', 'email', callback, param, action_param)
            break
        case '7':
            verifyUpdate(email, 'github', 'blog', callback, param, action_param)
            break
        case '8':
            verifyUpdate(email, 'github', 'company', callback, param, action_param)
            break
        case '9':
            verifyUpdate(email, 'github', 'location', callback, param, action_param)
            break
        case '10':
            verifyUpdate(email, 'github', 'hireable', callback, param, action_param)
            break
        case '11':
            verifyUpdate(email, 'github', 'bio', callback, param, action_param)
            break
        case '12'://
            verifyUpdate(email, 'movie', 'results.vote_count', callback, param, action_param)
            break
        case '13'://
            verifyUpdate(email, 'meteo', 'main.temp', callback, param, action_param)
            break
        case '14'://
            verifyUpdate(email, 'meteo', 'main.pressure', callback, param, action_param)
            break
        case '15'://
            verifyUpdate(email, 'meteo', 'main.humidity', callback, param, action_param)
            break    
        case '16'://
            verifyUpdate(email, 'meteo', 'wind.speed', callback, param, action_param)
            break
        case '17'://
            verifyUpdate(email, 'meteo', 'wind.deg', callback, param, action_param)
            break
        case '18'://
            verifyUpdate(email, 'meteo', 'clouds.all', callback, param, action_param)
            break
        case '19':
            verifyUpdate(email, 'movie', 'results.original_title', callback, param, action_param)
            break
        case '20':
            verifyUpdate(email, 'movie', 'results.popularity', callback, param, action_param)
            break
        case '21':
            verifyUpdate(email, 'movie', 'results.release_date', callback, param, action_param)
            break
        case '22':
            verifyUpdate(email, 'movie', 'results.vote_average', callback, param, action_param)
            break
        default:
            createAreaBySteps('sec|5', callback, 'null')
    }
}

function getAreasByUser(req, res) {
    found = false
    areas = ''

    admin.firestore().collection('USERS').where('email', '==', req.params.email).get()
    .then(querySnapshot => {
        if (querySnapshot.size === 1)
            found = true
        querySnapshot.forEach(documentSnapshot => {
            areas = documentSnapshot._fieldsProto.areas.stringValue
        })
        if (found) {
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({areas: areas}))
        } else {
            res.writeHead(401, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({areas: 'failed: no account exists with this email'}))
        }
    })
}


app.post('/register/:email/:password/', function(req, res) {
    createUser(req.params.email, req.params.password, res)
})

app.post('/login/:email/:password/', function(req, res) {
    logInAndOut(req, res, 'login')
})

app.post('/login/oauth2/check/:email/', function(req, res) {
    logInAndOut(req, res, 'oauth2')
})

app.post('/logout/:email/', function(req, res) {
    logInAndOut(req, res, 'logout')
})

app.get('/services/:email/', function(req, res) {
    getServicesByUser(req, res)
})

app.post('/services/subscribe/:email/:service_id/',  function(req, res, next) {
    call = areaCallback
    service_id = req.params.service_id
    servicesSubscriptionAndUnsubscription(req, res, next, 'subscribe', 'ok', call)
})

app.post('/services/unsubscribe/:email/:service_id/', function(req, res) {
    servicesSubscriptionAndUnsubscription(req, res, 'unsubscribe', 'ko')
})

app.post('/area/add/:email/:action_id/:action_param/:reaction_id/:reaction_param/', function(req, res) {
    var params = req.params
    manageAreas(req, res, 'area_add')
    launchArea(params.email, params.action_id, params.action_param, params.reaction_id, params.reaction_param)
})

app.post('/area/remove/:email/:action_id/:action_param/:reaction_id/:reaction_param/', function(req, res) {
    manageAreas(req, res, 'area_remove')
})

app.get('/area/:email/', function(req, res) {
    getAreasByUser(req, res)
})

app.get('/', function (req, res) { console.log('Enter here')})
app.use('/', about_routes)
app.use('/api',  github_routes);
app.use('/api', trello_routes);
app.use('/api', database_routes);

app.listen(PORT,() => console.log('Server up and running'));
