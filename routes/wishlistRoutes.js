const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const wishlistservice = require("../services/wishlistService");

router.get("/:userId", wishlistController.getWishlistByUserId);
router.post("/wishlistBooks/:bookId", wishlistController.addToWishlist); //add book to wishlist table
router.delete("/remove/:bookId", wishlistController.removeFromWishlist); //remove book from  wishlist table
router.put("/wishlistgetId", wishlistController.getBookIdforwishlist);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: The Wishlist management API
 */

/**
 * @swagger
 * /api/wishlist/{userId}:
 *   get:
 *     summary: Get the wishlist of a specific user by userId
 *     tags: [Wishlist]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user whose wishlist is to be retrieved
 *     responses:
 *       200:
 *         description: Wishlist fetched successfully
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
 *                     description: The 10-character ISBN of the book
 *                   ISBN13:
 *                     type: string
 *                     description: The 13-character ISBN of the book
 *                   publication_date:
 *                     type: string
 *                     description: The publication date of the book
 *                   description:
 *                     type: string
 *                     description: The description of the book
 *                   author:
 *                     type: string
 *                     description: The author(s) of the book
 *                   rating:
 *                     type: number
 *                     description: The average rating of the book
 *                   pages:
 *                     type: integer
 *                     description: Number of pages in the book
 *                   genre:
 *                     type: string
 *                     description: The genre of the book
 *                   imageUrl:
 *                     type: string
 *                     description: URL of the book cover image
 *                   resource:
 *                     type: string
 *                     description: The resource where book details were obtained
 *       404:
 *         description: Wishlist not found for this user
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/wishlist/wishlistBooks/{bookId}:
 *   post:
 *     summary: Add a book to the wishlist
 *     tags: [Wishlist]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the book to add to the wishlist
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Authorization token
 *     responses:
 *       200:
 *         description: Book added to wishlist successfully
 *       400:
 *         description: Book ID or token is missing
 *       500:
 *         description: Server error while adding the book to wishlist
 */

/**
 * @swagger
 * /api/wishlist/remove/{bookId}:
 *   delete:
 *     summary: Remove a book from the wishlist
 *     tags: [Wishlist]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the book to remove from the wishlist
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Authorization token
 *     responses:
 *       200:
 *         description: Book removed from wishlist successfully
 *       400:
 *         description: Book ID or token is missing
 *       500:
 *         description: Server error while removing the book from wishlist
 */

/**
 * @swagger
 * /api/wishlist/wishlistgetId:
 *   put:
 *     summary: Get the ID of a book from wishlist
 *     tags: [Wishlist]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               book:
 *                 type: object
 *                 description: The book details to fetch the ID for
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
 *                   title:
 *                     type: string
 *                     description: Title of the book
 *                   ISBN10:
 *                     type: string
 *                     description: 10-character ISBN of the book
 *                   ISBN13:
 *                     type: string
 *                     description: 13-character ISBN of the book
 *                   publication_date:
 *                     type: string
 *                     description: Publication date of the book
 *                   description:
 *                     type: string
 *                     description: Description of the book
 *                   author:
 *                     type: string
 *                     description: Author of the book
 *                   rating:
 *                     type: number
 *                     description: Rating of the book
 *                   pages:
 *                     type: integer
 *                     description: Number of pages
 *                   genre:
 *                     type: string
 *                     description: Genre of the book
 *                   imageUrl:
 *                     type: string
 *                     description: URL of the book cover image
 *                   resource:
 *                     type: string
 *                     description: Resource from where the book details were obtained
 *     responses:
 *       200:
 *         description: Book ID fetched successfully
 *       400:
 *         description: Invalid input or missing fields
 *       500:
 *         description: Server error while fetching book ID
 */
