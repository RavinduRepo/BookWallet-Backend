const express = require('express');
const router = express.Router();
const { googleAPISearch } = require('../services/googleBooksAPIServices');
const { searchUsers , searchGroups } = require("../controllers/searchController");


router.get('/books',googleAPISearch );
router.get('/users',searchUsers );
router.get('/groups',searchGroups );
module.exports = router;
