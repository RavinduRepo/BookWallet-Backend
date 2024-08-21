const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const getBookIdController = require('../controllers/getBookIdController');


// Define routes and assign controllers
router.get('/books/:id', bookController.findBookById);
router.post('/books', bookController.addBook);
//
router.get('/getBookId/:ISBN', bookController.getBookIdWithISBN);
router.put('/getBookId', getBookIdController.getBookIdController);
router.get('/getBookWithBookId/:bookId', bookController.getBookById);

module.exports = router;
