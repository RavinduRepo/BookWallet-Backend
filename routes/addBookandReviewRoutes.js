const express = require("express");
const router = express.Router();
const addBookAndReviewController = require("../controllers/addBookandReveiwController");
const validateBookReview = require("../middlewares/addBookadnReviewMiddleware");

// Add book, review both, or review only if book exists
router.post(
  "/add",
  validateBookReview,
  addBookAndReviewController.addBookAndReviewController
);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Add Books and Reviews
 *   description: The books and reviews management API
 */

/**
 * @swagger
 * /api/book-review/add:
 *   post:
 *     summary: Add a book and a review, or just a review if the book already exists
 *     tags: [Add Books and Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               book:
 *                 type: object
 *                 required:
 *                   - title
 *                   - ISBN10
 *                   - ISBN13
 *                   - publication_date
 *                   - description
 *                   - author
 *                   - rating
 *                   - pages
 *                   - genre
 *                   - imageUrl
 *                   - resource
 *                 properties:
 *                   bookId:
 *                     type: integer
 *                     description: The auto-generated id of the book
 *                   title:
 *                     type: string
 *                     description: The title of the book
 *                   ISBN10:
 *                     type: string
 *                     description: The 10-character ISBN identifier
 *                   ISBN13:
 *                     type: string
 *                     description: The 13-character ISBN identifier
 *                   publication_date:
 *                     type: string
 *                     description: The date the book was published
 *                   description:
 *                     type: string
 *                     description: A short description of the book
 *                   author:
 *                     type: string
 *                     description: The author(s) of the book
 *                   rating:
 *                     type: number
 *                     description: The average rating of the book
 *                   pages:
 *                     type: integer
 *                     description: The total number of pages in the book
 *                   genre:
 *                     type: string
 *                     description: The genre of the book
 *                   imageUrl:
 *                     type: string
 *                     description: URL of the book cover image
 *                   resource:
 *                     type: string
 *                     description: The source where the book details were obtained
 *               review:
 *                 type: object
 *                 required:
 *                   - bookId
 *                   - userId
 *                   - context
 *                   - rating
 *                 properties:
 *                   reviewId:
 *                     type: integer
 *                     description: The auto-generated id of the review
 *                   bookId:
 *                     type: integer
 *                     description: The id of the book being reviewed
 *                   userId:
 *                     type: integer
 *                     description: The id of the user who wrote the review
 *                   context:
 *                     type: string
 *                     description: The content of the review
 *                   rating:
 *                     type: number
 *                     description: Rating given to the book in the review
 *               token:
 *                 type: string
 *                 description: Authorization token
 *             required:
 *               - review
 *               - token
 *     responses:
 *       201:
 *         description: Book and review added successfully
 *       500:
 *         description: Database error
 */
