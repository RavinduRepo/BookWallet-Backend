const express = require("express");
const router = express.Router();
const storeController = require("../store_management/storeManagingController");
// Route to get shops by bookId
router.get("/book/:bookId", storeController.getShopsByBookId);

module.exports = router;
