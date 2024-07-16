const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define routes and assign controllers
router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);

module.exports = router;
