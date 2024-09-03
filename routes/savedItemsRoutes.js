const express = require("express");
const router = express.Router();
const savedItemsController = require("../controllers/savedItemsController");

router.get("/reviews/:userId", savedItemsController.getSavedReviewsByUserId);
router.get("/books/:userId", savedItemsController.getSavedBooksByUserId);
router.get("/profiles/:userId", savedItemsController.getSavedProfilesByUserId);

router.post("/save/review", savedItemsController.insertSavedReview);
router.post("/save/book", savedItemsController.insertSavedBook);
router.post("/save/profile", savedItemsController.insertSavedProfile);

module.exports = router;
