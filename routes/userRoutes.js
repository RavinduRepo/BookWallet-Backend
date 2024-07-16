const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
router.get("/users/:id", userController.getUserDetails);
module.exports = router;
