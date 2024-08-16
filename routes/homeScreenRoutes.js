const express = require('express');
const router = express.Router();
const homeScreenController = require('../controllers/homeScreenController');

router.get('/getHomeScreen/:userId', homeScreenController.getHomeScreen);
module.exports = router;
