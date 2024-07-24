const express = require('express');
const router = express.Router();
const { ReviewPost } = require('../controllers/reviewPostController');
router.post('/reviewpost', ReviewPost);
module.exports = router;
