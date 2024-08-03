const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');


// Define routes and assign controllers
router.get('/group/:id', groupController.getGroupMembers);
router.get('/group', groupController.getAllGroups); 

module.exports = router;