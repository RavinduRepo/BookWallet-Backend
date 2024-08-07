const express = require('express');
const router = express.Router();
const bookService = require('../services/bookService');
const getBookIdController = require('../controllers/getBookIdController');
const bookController = require('../controllers/bookController');


// Define routes and assign controllers
router.get('/books/:id', bookService.findBook);
router.post('/books', bookService.addBook);
//
router.get('/getBookId/:ISBN', bookService.getBookIdWithISBN);
router.put('/getBookId', getBookIdController.getBookIdController);
router.get('/getBookWithBookId/:bookId', bookController.getBookWithId);

module.exports = router;
