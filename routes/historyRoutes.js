const express = require("express");
const historyController = require("../controllers/historyController");

const router = express.Router();

router.get("/:userId/reviews", historyController.getReviewsByUserId);
router.get("/:userId/books", historyController.getBooksByUserId);
router.get("/:userId/user-details", historyController.getUserDetailsByUserId);
router.get("/all/:userId", historyController.getAllItems);
router.post("/reviewinsert", historyController.insertReviewHistory);
router.post("/bookinsert", historyController.insertBookHistory);
module.exports = router;
