const express = require("express");
const router = express.Router();
const {
  followUserController,
  unfollowUserController,
  checkIfFollowingController,
} = require("../controllers/userfollowController");

// Follow a user
router.post("/follow", followUserController);

// Unfollow a user
router.post("/unfollow", unfollowUserController);

// Route to check if a user is following another user
router.get("/check-follow", checkIfFollowingController);

module.exports = router;
