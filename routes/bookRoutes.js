const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');


// Define routes and assign controllers
router.get('/books/:id', bookController.findBook);
router.post('/books', bookController.addBook);
//
router.get('/getBookId/:ISBN', bookController.getBookIdWithISBN);

module.exports = router;