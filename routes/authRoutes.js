const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// require imageController
const { upload, addImage } = require('../controllers/imageController');

// require reviewController
const { getReview } = require('../controllers/reviewController');

// Define routes and assign controllers
router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);

// route image
router.post('/addimage', upload.single('image'), addImage);

// route review
router.post('/getreview/:reviewId',getReview );

module.exports = router;
