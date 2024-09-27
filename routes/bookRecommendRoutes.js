const express = require('express');
const router = express.Router();
const { postRecommendBook, getRecommendedBook } = require('../controllers/bookRecommendController');

// recommend book to followers
router.post('/followers/recommendedBooks/:bookId/:recommenderId', postRecommendBook);

// get recommended books to user
router.get('/recommendedBooks/:userId', getRecommendedBook);

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: Book Recommend
 *  description: The book recommend managing API
 */

/**
 * @swagger
 * /api/user/followers/recommendedBooks/{bookId}/{recommenderId}:
 *  post:
 *      summary: Post recommended book to followers
 *      tags: [Book Recommend]
 *      parameters:
 *          - in: path
 *            name: bookId
 *            schema:
 *              type: integer
 *            required: true
 *            description: The book ID
 *          - in: path
 *            name: recommenderId
 *            schema:
 *              type: integer
 *            required: true
 *            description: The user ID of the book recommender
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          token:
 *                              type: string
 *                              description: Authorization token
 *                      required:
 *                          - token
 *      responses:
 *          200:
 *              description: Book recommended to the followers successfully
 *          500:
 *              description: Server error while recommending
 * 
 * 
 * /api/user/recommendedBooks/{userId}:
 *  get:
 *      summary: get recommended books of the user
 *      tags: [Book Recommend]
 *      parameters:
 *          - in: path
 *            name: userId
 *            schema:
 *              type: integer
 *            required: true
 *            description: The user id
 *      responses:
 *          200:
 *              description: recommended books details
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Book'
 *          404:
 *              description: No recommended books
 *          500:
 *              description: Database error
 */
