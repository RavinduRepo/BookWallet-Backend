const express = require("express");
const router = express.Router();
const savedItemsController = require("../controllers/savedItemsController");
//fetch saved items
router.get("/reviews/:userId", savedItemsController.getSavedReviewsByUserId);
router.get("/books/:userId", savedItemsController.getSavedBooksByUserId);
router.get("/profiles/:userId", savedItemsController.getSavedProfilesByUserId);
//saving saved items
router.post("/save/review", savedItemsController.insertSavedReview);
router.post("/save/book", savedItemsController.insertSavedBook);
router.post("/save/profile", savedItemsController.insertSavedProfile);
// Removing saved items
router.post("/remove/review", savedItemsController.removeSavedReview);
router.post("/remove/book", savedItemsController.removeSavedBook);
router.post("/remove/profile", savedItemsController.removeSavedProfile);
// Check if an item is saved
router.post("/reviews/is-saved", savedItemsController.isReviewSaved);
// router.post("/books/is-saved", savedItemsController.isBookSaved); //this is checking with bookcheckstatus
router.post("/profiles/is-saved", savedItemsController.isProfileSaved);

module.exports = router;
