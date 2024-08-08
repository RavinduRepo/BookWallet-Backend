const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const wishlistservice = require('../services/wishlistService');
const isInWishlistController = require('../controllers/isInWishlistController');

router.get('/IsinWishlist/:userId/:bookId', isInWishlistController.checkWishlist);
router.get('/:userId', wishlistController.getWishlistByUserId);
router.post('/wishlistBooks/:bookId/:userId',wishlistservice.postWishlistBook);
router.delete('/remove/:bookId/:userId', wishlistservice.removeFromWishlist);

module.exports = router;
