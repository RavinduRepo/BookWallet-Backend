const express = require('express');
const router = express.Router();
const { googleAPISearch } = require('../services/googleBooksAPIServices');
const { searchUsers, searchGroups } = require("../controllers/searchController");

/**
 * @swagger
 * /api/search/books:
 *   get:
 *     summary: Search for books using Google Books API
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: The search term for books
 *       - in: query
 *         name: index
 *         required: true
 *         schema:
 *           type: integer
 *         description: The page index for pagination (starting from 1)
 *     responses:
 *       200:
 *         description: A list of books matching the search term
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   author:
 *                     type: string
 *                   pages:
 *                     type: integer
 *                   genre:
 *                     type: string
 *                   ISBN10:
 *                     type: string
 *                   ISBN13:
 *                     type: string
 *                   publishedDate:
 *                     type: string
 *                   totalRating:
 *                     type: number
 *                   imageUrl:
 *                     type: string
 *                   description:
 *                     type: string
 *                   resource:
 *                     type: string
 *       400:
 *         description: Query and index are required
 *       500:
 *         description: Error fetching data from Google Books API
 */
router.get('/books', googleAPISearch);

/**
 * @swagger
 * /api/search/users:
 *   get:
 *     summary: Search for users
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: The search term for users
 *       - in: query
 *         name: index
 *         required: true
 *         schema:
 *           type: integer
 *         description: The page index for pagination (starting from 1)
 *     responses:
 *       200:
 *         description: A list of users matching the search term
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: string
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *       400:
 *         description: Query and index are required
 *       404:
 *         description: No users found
 *       500:
 *         description: Internal server error
 */
router.get('/users', searchUsers);

/**
 * @swagger
 * /api/search/groups:
 *   get:
 *     summary: Search for groups
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: The search term for groups
 *       - in: query
 *         name: index
 *         required: true
 *         schema:
 *           type: integer
 *         description: The page index for pagination (starting from 1)
 *       - in: query
 *         name: user_id
 *         required: false
 *         schema:
 *           type: string
 *         description: The user ID to filter groups
 *     responses:
 *       200:
 *         description: A list of groups matching the search term
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   groupId:
 *                     type: string
 *                   groupName:
 *                     type: string
 *                   members:
 *                     type: integer
 *       400:
 *         description: Query and index are required
 *       404:
 *         description: No groups found
 *       500:
 *         description: Internal server error
 */
router.get('/groups', searchGroups);

module.exports = router;
