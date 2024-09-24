const express = require('express');
const bookStatusCheckingController = require('../controllers/bookStatusCheckingController');

const router = express.Router();

// Route to check the wishlist and save status of a book for a specific user
router.get('/:userId/:bookId/status', bookStatusCheckingController.checkBookStatus);

module.exports = router;
