const express = require('express');
const router = express.Router();
const { googleAPISearch } = require('../services/googleBooksAPIServices');
const { seachUsers } = require("../services/searchService");


router.get('/books',googleAPISearch );
router.get('/users',seachUsers );
router.get('/groups',googleAPISearch );
module.exports = router;
