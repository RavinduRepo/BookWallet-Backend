const express = require('express');
const router = express.Router();
const trendingController = require('../controllers/trendingController');

// Route to fetch trending books
router.get('/trendingBooks', trendingController.getTrendingBooks);

module.exports = router;
