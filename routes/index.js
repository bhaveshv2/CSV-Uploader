const express = require('express');
const router = express.Router();

//Importing main controller
const fileController = require('../controllers/file_controller');

//Home Router
router.get('/', fileController.home);

//Other Routers
router.use('/files',require('./files'));

module.exports=router;
