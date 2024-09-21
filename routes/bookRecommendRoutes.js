const express = require('express');
const router = express.Router();
const { postRecommendBook, getRecommendedBook } = require('../controllers/bookRecommendController');
router.post('/followers/recommendedBooks/:bookId/:recommenderId', postRecommendBook);
router.get('/recommendedBooks/:userId', getRecommendedBook);
module.exports = router;
