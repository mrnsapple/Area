
const qs = require("query-string")
const env_var = require("../env_variables")
const request = require('superagent');
var url = require('url');

async function githubOauthCall(req, res, next) {
	const { query} = req;
	const { email } = query;

    console.log('Enter githubOauthCall '+ env_var.githubId)
	try {
        url = "https://github.com/login/oauth/authorize?" +
            qs.stringify({
                redirect_url: 'http://localhost/api/auth/oauth/github/callback',
                client_id: "caf1e0fc4050932109e8",
				state: email
				//client_secret: "250ca37125e200803ffdc5eb0fc5f14888a19857",
                //scope: 'user repo',
                //state: "adsedemmddiiddekmkfsamge"
			});

		console.log(url)
        return res.redirect(url)
	} catch (err) {
        console.log("Error:" + err + "::ERROR")
		//return next(err);
	}
};

//http://localhost:8080/api/auth/oauth/github/call
async function githubOauthCallback(req, res, next){
	const { query} = req;
	const { code } = query;
	const { state } = query;
	//console.log("STATE IN GITHUBCALLBACK:" + state)

	
	if (!code || !state) {
		return res.send({
			success: false,
			message: 'Error: no code or state in request'
		});
	}
	request
		.post('https://github.com/login/oauth/access_token')
		.send({
			client_id: 'caf1e0fc4050932109e8',
			client_secret: '250ca37125e200803ffdc5eb0fc5f14888a19857',
			code: code,
			//redirect_url: 'http://localhost:8080/api/auth/oauth/github/savetoken',
		})
		.set('Accept', 'application/json')
		.then(function(result) {
			const data = result.body;
			const { access_token } = data;
			url = 'http://localhost:8080/api/auth/oauth/database/save?&email=' + state +'&field=github.accestoken&value=' + access_token
			console.log("Data: %j", data);
			console.log("URL:"+ url)
			console.log("token:"+ (access_token))
			return res.redirect(url)
			
		});

};

async function githubGetUserInfo(accestoken)
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

/**
 *
 * This function updates github fields 
 * For github available fields are:
 * "name"
 * "email"
 * "blog"
 * "company"
 * "location"
 * "hireable"
 * "bio"
 */
async function githubUpdateUserInfo(accestoken, data){
	console.log("__in githubUdateUserInfo___,accestoken:"+accestoken+" updating data:%j", data)
	await request
		.patch('https://api.github.com/user')
		.send(data)
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

exports.githubUpdateUserInfo = githubUpdateUserInfo
exports.githubGetUserInfo = githubGetUserInfo
exports.githubOauthCallback = githubOauthCallback
exports.githubOauthCall = githubOauthCall
