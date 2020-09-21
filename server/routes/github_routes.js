
const router = require('express').Router();
const githubApi = require("../api/github_api")

router.get('/auth/oauth/github/callback', githubApi.githubOauthCallback);
router.get('/auth/oauth/github/call',githubApi.githubOauthCall);

module.exports = router;
