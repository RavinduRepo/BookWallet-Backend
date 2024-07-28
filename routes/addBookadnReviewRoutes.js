const express = require("express");
const router = express.Router();
const addBookAndReviewController = require("../controllers/addBookandReveiwController");
const validateBookReview = require("../middlewares/addBookadnReviewMiddleware");

router.post(
  "/add",
  validateBookReview,
  addBookAndReviewController.addBookAndReviewController
);
module.exports = router;
