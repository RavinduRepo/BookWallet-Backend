const express = require('express');
const router = express.Router();
const { googleAPISearch } = require('../services/googleBooksAPIServices');


router.get('/search',googleAPISearch );
// router.get('/getReviews',getReviews );
module.exports = router;
