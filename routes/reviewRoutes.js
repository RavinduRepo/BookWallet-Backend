const express = require('express');
const router = express.Router();
const { getReviewWithId, getReviews } = require('../controllers/reviewController');
router.get('/getReviewWithId/:reviewId',getReviewWithId );
router.get('/getReviews',getReviews );
module.exports = router;
