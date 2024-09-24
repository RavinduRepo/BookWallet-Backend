const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const wishlistservice = require("../services/wishlistService");

router.get("/:userId", wishlistController.getWishlistByUserId);
router.post("/wishlistBooks/:bookId/:userId", wishlistservice.postWishlistBook);
router.delete("/remove/:userId/:bookId", wishlistController.removeFromWishlist);
router.put("/wishlistgetId", wishlistController.getBookIdforwishlist);

module.exports = router;
