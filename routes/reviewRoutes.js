const express = require('express');
const router = express.Router();
const { getReviewWithId, getReviews, getReviewWithBookId, getReviewWithUserId } = require('../controllers/reviewController');
router.get('/getReviewWithId/:reviewId', getReviewWithId );
router.get('/getReviews',getReviews );
router.get('/getReviewWithBookId/:bookId', getReviewWithBookId);
router.get('/getReviewWithUserId/:userId', getReviewWithUserId);
module.exports = router;
