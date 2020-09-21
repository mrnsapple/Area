
const qs = require("query-string")
const env_var = require("../env_variables")
const request = require('superagent');
var url = require('url');
var database = require('../database/database')
/*
	Calling to url we get the token for use trello app
	http://localhost:8080/api/auth/oauth/trello/call
	gives token o redirect url but is in the fragment, it can be obtained from front
	https://stackoverflow.com/questions/17744003/get-url-after-in-express-js-middleware-request
*/
async function trelloOauthCall(req, res, next) {

    console.log('Enter trelloOauthCall '+ env_var.githubId)
	try {
        url = "https://trello.com/1/authorize?" +
            qs.stringify({
				expiration: 'never',
				name: 'Area Project',
				scope: 'read,write,account',
				callback_method: 'fragment',
				return_url: 'http://localhost:8080/api/auth/oauth/trello/callback',
				key: '034be0dba1dd019d4ad2ad30e860398a',
				response_type: 'token'
        	});

		console.log(url)
        return res.redirect(url)
	} catch (err) {
        console.log("Error:" + err + "::ERROR")
		//return next(err);
	}
};
//http://localhost:8080/api/auth/oauth/github/call
async function trelloOauthCallback(req, res, next){
	var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl+ req.hash;
	console.log("Enter trello callback"+ fullUrl)
	return 
}

async function trelloGetUserInfo(accestoken)
{
	data = ""
	await request
		.get('https://api.github.com/user')
		.set('Authorization', 'token ' + accestoken)
		.set('User-Agent', "Awesome-Octocat-App")
		.then(function(result) {
			data = result.body;
		})
		.catch(function(err) {
		console.log("Error:"+err.message)
		});
	return data
}
exports.trelloGetUserInfo = trelloGetUserInfo

exports.trelloOauthCallback = trelloOauthCallback
exports.trelloOauthCall = trelloOauthCall
