const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const getBookId = require('../controllers/getBookIdController');

/**
 * @swagger
 * tags:
 *  name: Book
 *  description: The book managing API
 */

/**
 * @swagger
 * /api/book/getBookId/{ISBN}:
 *  get:
 *      summary: Get bookID using ISBN of the book
 *      tags: [Book]
 *      parameters:
 *          - in: path
 *            name: ISBN
 *            schema:
 *              type: integer
 *            required: true
 *            description: The ISBN of the book
 *      responses:
 *          200:
 *              description: Book ID
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  bookId:
 *                                      type: integer
 *                                      description: The ID of the book
 *                                      example: 35
 *          404:
 *              description: Book ID not found
 *          500:
 *              description: Database error
 */

router.get('/getBookId/:ISBN', bookController.getBookIdWithISBN);

/**
 * @swagger
 * /api/book/getBookId:
 *  put:
 *      summary: Get bookID using ISBN of the book
 *      tags: [Book]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          book:
 *                              type: object
 *                              properties:
 *                                  title:
 *                                      type: string
 *                                      description: Title of the book
 *                                      example: "The Winds of Dune"
 *                                  ISBN10:
 *                                      type: string
 *                                      description: 10-digit ISBN
 *                                      example: "184737848X"
 *                                  ISBN13:
 *                                      type: string
 *                                      description: 13-digit ISBN
 *                                      example: "9781847378484"
 *                                  publication_date:
 *                                      type: string
 *                                      format: date
 *                                      description: Date of publication
 *                                      example: "2009-10-01"
 *                                  description:
 *                                      type: string
 *                                      description: Summary or description of the book
 *                                      example: "Between the end of Frank Herbert's DUNE and his next book..."
 *                                  author:
 *                                      type: string
 *                                      description: Author(s) of the book
 *                                      example: "Kevin J. Anderson, Brian Herbert"
 *                                  rating:
 *                                      type: number
 *                                      format: float
 *                                      description: Rating of the book
 *                                      example: 4.1
 *                                  pages:
 *                                      type: integer
 *                                      description: Number of pages
 *                                      example: 592
 *                                  genre:
 *                                      type: string
 *                                      description: Genre of the book
 *                                      example: "Fiction"
 *                                  imageUrl:
 *                                      type: string
 *                                      description: URL to the book's image
 *                                      example: "http://books.google.com/books/content?id=BpgkiOdga..."
 *                                  resource:
 *                                      type: string
 *                                      description: Source of the book information
 *                                      example: "Google"
 *      responses:
 *          200:
 *              description: Book ID
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              type: object
 *                              properties:
 *                                  bookId:
 *                                      type: integer
 *                                      description: The ID of the book
 *                                      example: 27
 *          404:
 *              description: Book ID not found
 *          500:
 *              description: Database error
 */

router.put('/getBookId', getBookId.getBookIdController);

/**
 * @swagger
 * /api/book/getBook/{bookId}:
 *  get:
 *      summary: Get book using the ID of the book
 *      tags: [Book]
 *      parameters:
 *          - in: path
 *            name: bookId
 *            schema:
 *              type: integer
 *            required: true
 *            description: The ID of the book
 *      responses:
 *          200:
 *              description: Book details
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/Book'
 *          404:
 *              description: Book ID not found
 *          500:
 *              description: Database error
 */

router.get('/getBook/:bookId', bookController.getBookById);
// router.get('/books/:id', bookController.findBookById);
// router.post('/books', bookController.addBook);

module.exports = router;
