const express = require('express');
const { storeDetails, bookDetails } = require('./storeController');

const router = express.Router();

router.post('/submit/storedetails', storeDetails);
router.post('/submit/bookdetails', bookDetails);

module.exports = router;
