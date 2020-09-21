
const admin = require('firebase-admin')

const github_api = require('../api/github_api')
const trello_api = require('../api/trello_api')
const meteo_api = require('../api/meteo')
const movie_api = require('../api/movie_api')
var access_tokens = { 'github': 'github.accestoken', 'trello': 'trello.accestoken', 'meteo':'', 'movie':''}

/**
 *
 * UPDAES the data in the database with the api info
 * 
 * -Params: email and service(for now github or trello)
 * 
 */
async function UpdateInfoDatabase(req, res, next){
	const { query} = req;
	var { email } = query;
    var { service } = query;
    console.log("Email:" + email + "service:" + service +"\n")
    return await DatabaseUpdate(query, res, email, service)
   
}
/*
*  UPDATES the data in the database with the content given by the client
*
*/
async function databaseSave(req, res, next){
	const { query} = req;
	var { value } = query;
    var { email } = query;
    var { field } = query;
	await databaseAction(email, 'USERS', field, value, "update")
}

/*
*
* UPDATES data in the api with the content given by the client
*/

async function UpdateInfoApi(email, service, field_name, field_value) {
    console.log("__INSIDE UPDATEINFOAPI\n");
    console.log(email+","+service+","+field_name+","+field_value+"\n")
	var accestoken = await databaseAction(email, 'USERS', access_tokens[service], "", "get")
    accestoken = "bea816b69903d1f13a79bb81634d404a74a5e948";
    sending_inf = new Object()
    sending_inf[field_name] = field_value

    UpdateApiData(service, accestoken, sending_inf)
    //await databaseAction(res, email, 'USERS', field_name, field_value, "update")
}
/*
 * Tells if  api version != database version for specific field
 * 
 * For "github" available fields are:
 * "name","email","blog","company","location","hireable","bio"
 * For "meteo" are:
 * "weather.main", "main.temp", "main.preassure", "main.humidity","wind.speed", "wind.deg","clouds.all"
 * For "movie" are:
 */
async function GetSpecificDatabaseField(email, service, field_name, given_necesary_field) {
    var  necesary_field = "";
    var return_value = false;
    if (service == 'github')
        necesary_field = await databaseAction(email, 'USERS', access_tokens[service], "", "get")
    if (service == 'meteo')
        necesary_field = given_necesary_field
    console.log("email:" + email + ", service:" + service + ", field_name :" + field_name + ", given:" + given_necesary_field + "\n")
    console.log("necesaryfield:" + JSON.stringify(necesary_field))
    data = await GetApiData(service, necesary_field)
    var split = field_name.split("."); 
    console.log("split:" + split)
    console.log( JSON.stringify("data"),data)
    console.log( JSON.stringify("data"),data[split[0]])
    console.log( JSON.stringify("data"),data[split[0]][split[1]] )

    return_val = { 'change': false, 'previous': undefined, 'new': undefined };
	if (data) {
		database_data = await databaseAction(email, 'USERS', service, "", "get")
        console.log( JSON.stringify("\n__DATABASEDATA\n"),database_data)
        if (service == 'meteo' || service == 'movie')
            return_val =  {'change': false, 'previous': database_data[split[0]][split[1]], 'new': data[split[0]][split[1]] }
		else
            return_val =  {'change': false, 'previous': database_data[split[0]], 'new': data[split[0]] }
            console.log( JSON.stringify("return val_bef"),return_val)
        if (return_val['previous'] != return_val['new']) {
            return_value = true;
            databaseAction(email, 'USERS', service+"."+field_name, return_val['new'], "update")
            return_val.change= true

        }
    }
    return return_value;
    //console.log( JSON.stringify("return valend"),return_val)
    return return_val['change'];
}
/*
* FOLLOWING FUNCTIONS ARE NOT ENDPOINTS ARE USED BY THE PREVIOUS ONES
*/
async function GetApiData(service, necesary_field) {
    data = ""
    if (service == 'github')
      data = await github_api.githubGetUserInfo(necesary_field)
    if (service == 'trello')
        data = await trello_api.trelloGetUserInfo(necesary_field) 
    if (service == 'meteo')
        data = await meteo_api.meteoGetInfo(necesary_field)
    if (service == 'movie')
        data = await movie_api.movieGetInfo()
    return data
}

async function UpdateApiData(service, accestoken, sending_inf) {
    if (service == 'github')
        await github_api.githubUpdateUserInfo(accestoken, sending_inf)
    // if (service == 'trello')
    //     continue
        //await trello_api.trelloGetUserInfo(accesstoken) 
}

async function DatabaseUpdate(query, res, email, service) {
    var necesary_field = ""
    if (service == 'github' || service == 'trello')
        necesary_field = "bea816b69903d1f13a79bb81634d404a74a5e948"//await databaseAction(email, 'USERS', access_tokens[service], "", "get")
    else if (service == 'meteo')
        necesary_field = query.city
    data = await GetApiData(service, necesary_field)
    if (service == 'github')
        data["accestoken"] = necesary_field;
    if (data)
		await databaseAction(email, 'USERS', service, data, "update")
	else {
		console.log("No data found")
	}
}

/*
* Chose what to get from the documentSnapshot data
*/
function getdatabase(documentSnapshot, field_name) {
    return_val = documentSnapshot.data()
    if (return_val == undefined)
        return return_val
    if (field_name == 'github.accestoken')
        return return_val.github.accestoken
    return return_val[field_name]
}
/*
* Determines what action to do in the database 
*/
async function databaseAction(email, collection, field_name, value, action) {
    console.log("___ENTER IN DATABASEACTION___")
    console.log("email:" + email +" , field_name:" +field_name + ", field_value:" + value + ", action" + action + "\n")
    return_val = ""
    await admin.firestore().collection('USERS').where('email','==', email).get()
	.then(querySnapshot => {
        if (querySnapshot.size === 1) {
            querySnapshot.forEach(documentSnapshot => {
                if (action == 'update')
    	            admin.firestore().collection(collection).doc(documentSnapshot.id).update({[field_name]: value })
                if (action == 'delete')
                    admin.firestore().collection(collection).doc(documentSnapshot.id).delete(field_name)
                if (action == 'get')
                    return_val = getdatabase(documentSnapshot, field_name)
                //res.end(JSON.stringify({'Status': 'success'}))
            })
        } else {
            //res.end(JSON.stringify({'Status': 'failed: no account exists with this email'}))
        }
    })
    return return_val
}


exports.UpdateInfoApi = UpdateInfoApi
exports.databaseAction = databaseAction
exports.databaseSave = databaseSave
exports.UpdateInfoDatabase = UpdateInfoDatabase
exports.GetSpecificDatabaseField = GetSpecificDatabaseField