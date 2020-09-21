const router = require('express').Router();
const database = require('../database/database')

router.get('/auth/oauth/database/save',database.databaseSave);
router.get('/auth/oauth/database/update_info_database',database.UpdateInfoDatabase);
router.get('/auth/oauth/database/get_specific_database_field',database.GetSpecificDatabaseField);
router.get('/auth/oauth/database/update_info_api',database.UpdateInfoApi);

module.exports = router;

