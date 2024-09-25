const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const wishlistservice = require("../services/wishlistService");

router.get("/:userId", wishlistController.getWishlistByUserId);
router.post("/wishlistBooks/:bookId", wishlistController.addToWishlist); //add book to wishlist table
router.delete("/remove/:bookId", wishlistController.removeFromWishlist); //remove book from  wishlist table
router.put("/wishlistgetId", wishlistController.getBookIdforwishlist);

module.exports = router;
