const router = require('express').Router();
const aboutContent = require('../models/About');

router.get('/about.json',aboutContent.sendAbout);
module.exports = router;