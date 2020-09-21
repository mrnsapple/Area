
const router = require('express').Router();
const trelloApi = require("../api/trello_api")

router.get('/auth/oauth/trello/callback', trelloApi.trelloOauthCallback);
router.get('/auth/oauth/trello/call',trelloApi.trelloOauthCall);

module.exports = router;
