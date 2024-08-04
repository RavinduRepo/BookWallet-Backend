const express = require('express');
const router = express.Router();
const { getPosts } = require('../services/postService');
router.get('/reviews', getPosts);
module.exports = router;
