const express = require('express');
const router = express.Router();
const trendingController = require('../controllers/trendingController');

// Route to fetch trending books
router.get('/trendingBooks', trendingController.getTrendingBooks);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Trending Books
 *   description: API to manage trending books
 */

/**
 * @swagger
 * /api/trending/trendingBooks:
 *   get:
 *     summary: Get a list of trending books in ascending order of their rank
 *     tags: [Trending Books]
 *     responses:
 *       200:
 *         description: A list of trending books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
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
 *       500:
 *         description: Server error while fetching trending books
 */