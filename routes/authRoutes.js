const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define routes and assign controllers
router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);
router.get('/protected', authController.handleToken);

// Update all details
router.put("/updatealldetails/:id", authController.verifyUpdateDetails);

module.exports = router;
