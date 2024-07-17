const express = require('express');
const router = express.Router();
const { upload, addImage } = require('../controllers/imageController');
router.post('/addimage', upload.single('image'), addImage);
module.exports = router;
