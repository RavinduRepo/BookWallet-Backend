const express = require('express');
const router = express.Router();
const bookController = require('../services/bookService');
const getBookIdController = require('../controllers/getBookIdController');

// Define routes and assign controllers
router.get('/books/:id', bookController.findBook);
router.post('/books', bookController.addBook);
//
router.get('/getBookId/:ISBN', bookController.getBookIdWithISBN);
router.put('/getBookId', getBookIdController.getBookIdController);
router.get('/getBookWithBookId/:bookId', bookController.getBookIdController);

module.exports = router;
