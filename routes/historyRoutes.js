const express = require("express");
const historyController = require("../controllers/historyController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: History
 *   description: API endpoints to manage History
 */
/**
 * @swagger
 * /api/history/{userId}/reviews:
 *    get:
 *      summary: Get reviews by user ID
 *      tags: [History]
 *      parameters:
 *        - in: path
 *          name: userId
 *          required: true
 *          description: The ID of the user whose reviews are to be fetched
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Successfully fetched reviews for the user
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    searchIndex:
 *                      type: integer
 *                      description: The index of the review in the search results
 *                    post:
 *                      type: object
 *                      description: The review object
 *                      properties:
 *                        reviewId:
 *                          type: string
 *                          description: The ID of the review
 *                        content:
 *                          type: string
 *                          description: The content of the review
 *                        rating:
 *                          type: integer
 *                          description: The rating given in the review
 *                        date:
 *                          type: string
 *                          format: date-time
 *                          description: The date the review was created
 *        500:
 *          description: An error occurred while fetching reviews
 */

router.get("/:userId/reviews", historyController.getReviewsByUserId);
/**
 * @swagger
 * /api/history/{userId}/books:
 *   get:
 *     summary: Get books by user ID
 *     tags: [History]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user whose books are to be fetched
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched books for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       400:
 *         description: Invalid user ID or other client-side error
 *       500:
 *         description: Failed to retrieve books due to a server error
 */

router.get("/:userId/books", historyController.getBooksByUserId);
/**
 * @swagger
 * /api/history/{userId}/user-details:
 *   get:
 *     summary: Get user details by user ID
 *     tags: [History]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user whose details are to be fetched
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   description: The unique identifier for the user
 *                 username:
 *                   type: string
 *                   description: The user's username
 *                 email:
 *                   type: string
 *                   description: The user's email address
 *                 bio:
 *                   type: string
 *                   description: A short biography of the user
 *                 location:
 *                   type: string
 *                   description: The user's location
 *                 joinedDate:
 *                   type: string
 *                   format: date
 *                   description: The date the user joined
 *               example:
 *                 userId: "123"
 *                 username: "john_doe"
 *                 email: "john.doe@example.com"
 *                 bio: "Avid reader and book lover"
 *                 location: "New York, USA"
 *                 joinedDate: "2022-05-10"
 *       400:
 *         description: Invalid user ID or other client-side error
 *       500:
 *         description: Failed to retrieve user details due to a server error
 */
router.get("/:userId/user-details", historyController.getUserDetailsByUserId);
/**
 * @swagger
 * /api/history/all/{userId}:
 *   get:
 *     summary: Retrieve all items (books, reviews, etc.) associated with a user
 *     description: Fetch all books, reviews, and any shared items associated with the specified user.
 *     tags: [History]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user whose items are to be retrieved
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully fetched all items for the specified user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 oneOf:
 *                   - $ref: '#/components/schemas/Book'
 *                   - $ref: '#/components/schemas/Review'
 *                   - $ref: '#/components/schemas/Share'
 *               example:
 *                 - bookId: 12
 *                   title: "The Winds of Dune"
 *                   ISBN10: "184737848X"
 *                   ISBN13: "9781847378484"
 *                   publication_date: "2009-10-01"
 *                   description: "Between the end of Frank Herbert's DUNE and his next book..."
 *                   author: "Kevin J. Anderson, Brian Herbert"
 *                   rating: 4.5
 *                   pages: 592
 *                   genre: Fiction
 *                   imageUrl: "http://books.google.com/books/content?id=BpgkiOdga..."
 *                   resource: "Google"
 *                 - reviewId: 10
 *                   bookId: 116
 *                   userId: 27
 *                   imageUrl: ""
 *                   title: ""
 *                   author: ""
 *                   context: "Excellent book with great insights!"
 *                   rating: 4.5
 *                   date: "2024-09-14"
 *                   username: ""
 *                   likesCount: 0
 *                   commentsCount: 0
 *                   sharesCount: 0
 *                 - reviewId: 15
 *                   sharerUsername: "john_doe"
 *                   bookId: 116
 *                   userId: 27
 *                   imageUrl: ""
 *                   title: ""
 *                   author: ""
 *                   context: "A fascinating read!"
 *                   rating: 4.5
 *                   date: "2024-09-14"
 *                   username: "john_doe"
 *                   likesCount: 0
 *                   commentsCount: 0
 *                   sharesCount: 0
 *                   sharerUserId: 102
 *       400:
 *         description: Invalid user ID or client-side error
 *       500:
 *         description: Failed to retrieve items due to server error
 */
router.get("/all/:userId", historyController.getAllItems);

/**
 * @swagger
 * /api/history/reviewinsert:
 *   post:
 *     summary: Insert review history for a user
 *     description: Logs a review history entry for a specified user based on the token and relevant review ID.
 *     tags: [History]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - relevant_id
 *             properties:
 *               token:
 *                 type: string
 *                 description: JWT token of the authenticated user
 *               relevant_id:
 *                 type: integer
 *                 description: The ID of the review being inserted into the history
 *             example:
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               relevant_id: 35
 *     responses:
 *       200:
 *         description: Review History inserted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Review History inserted successfully"
 *       400:
 *         description: Invalid request parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid request data"
 *       401:
 *         description: Unauthorized request due to invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized: Invalid or missing token"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred while inserting review history"
 */

router.post("/reviewinsert", historyController.insertReviewHistory);
/**
 * @swagger
 * /api/history/bookinsert:
 *   post:
 *     summary: Insert book history for a user
 *     description: Logs a book history entry for a specified user based on the token and relevant book ID. It also increments the trending points for the book.
 *     tags: [History]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - relevant_id
 *             properties:
 *               token:
 *                 type: string
 *                 description: JWT token of the authenticated user
 *               relevant_id:
 *                 type: integer
 *                 description: The ID of the book being inserted into the history
 *             example:
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               relevant_id: 123
 *     responses:
 *       200:
 *         description: Book History inserted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book History inserted successfully"
 *       400:
 *         description: Invalid request parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid request data"
 *       401:
 *         description: Unauthorized request due to invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized: Invalid or missing token"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred while inserting book history"
 */

router.post("/bookinsert", historyController.insertBookHistory);
module.exports = router;
