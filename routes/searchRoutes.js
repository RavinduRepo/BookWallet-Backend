const express = require('express');
const router = express.Router();
const { googleAPISearch } = require('../services/googleBooksAPIServices');
const { searchUsers , searchGroups } = require("../controllers/searchController");

// Route for search Books
router.get('/books',googleAPISearch );

// Route for search Users
router.get('/users',searchUsers );

// Route for search Groups
router.get('/groups',searchGroups );
module.exports = router;
