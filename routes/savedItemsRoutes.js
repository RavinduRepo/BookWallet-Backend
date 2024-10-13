const express = require("express");
const router = express.Router();
const savedItemsController = require("../controllers/savedItemsController");
//fetch saved items
router.get("/reviews/:userId", savedItemsController.getSavedReviewsByUserId);
router.get("/books/:userId", savedItemsController.getSavedBooksByUserId);
router.get("/profiles/:userId", savedItemsController.getSavedProfilesByUserId);
//saving saved items
router.post("/save/review", savedItemsController.insertSavedReview);
router.post("/save/book", savedItemsController.insertSavedBook);
router.post("/save/profile", savedItemsController.insertSavedProfile);
// Removing saved items
router.post("/remove/review", savedItemsController.removeSavedReview);
router.post("/remove/book", savedItemsController.removeSavedBook);
router.post("/remove/profile", savedItemsController.removeSavedProfile);
// Check if an item is saved
router.post("/reviews/is-saved", savedItemsController.isReviewSaved);
// router.post("/books/is-saved", savedItemsController.isBookSaved); //this is checking with bookcheckstatus
router.post("/profiles/is-saved", savedItemsController.isProfileSaved);

module.exports = router;



/**
 * @swagger
 * tags:
 *   name: Saved Items
 *   description: API to manage user saved items
 */

/**
 * @swagger
 * /api/saved-items/reviews/{userId}:
 *   get:
 *     summary: Retrieve saved reviews for a user
 *     tags: [Saved Items]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: List of saved reviews for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   post:
 *                     type: string
 *                     description: The content of the saved review
 *       500:
 *         description: Error fetching saved reviews
 */

/**
 * @swagger
 * /api/saved-items/books/{userId}:
 *   get:
 *     summary: Retrieve saved books for a user
 *     tags: [Saved Items]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: List of saved books for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   book:
 *                     type: string
 *                     description: The content of the saved book
 *       500:
 *         description: Error fetching saved books
 */

/**
 * @swagger
 * /api/saved-items/profiles/{userId}:
 *   get:
 *     summary: Retrieve saved profiles for a user
 *     tags: [Saved Items]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: List of saved profiles for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   profile:
 *                     type: string
 *                     description: The content of the saved profile
 *       500:
 *         description: Error fetching saved profiles
 */

/**
 * @swagger
 * /api/saved-items/save/review:
 *   post:
 *     summary: Save a review for a user
 *     tags: [Saved Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: User's authentication token
 *               relevant_id:
 *                 type: integer
 *                 description: ID of the review to be saved
 *     responses:
 *       200:
 *         description: Successfully saved review
 *       500:
 *         description: Error saving review
 */

/**
 * @swagger
 * /api/saved-items/remove/review:
 *   post:
 *     summary: Remove a saved review for a user
 *     tags: [Saved Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: User's authentication token
 *               relevant_id:
 *                 type: integer
 *                 description: ID of the saved review to remove
 *     responses:
 *       200:
 *         description: Successfully removed saved review
 *       500:
 *         description: Error removing saved review
 */

/**
 * @swagger
 * /api/saved-items/reviews/is-saved:
 *   post:
 *     summary: Check if a review is saved by a user
 *     tags: [Saved Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: User's authentication token
 *               relevant_id:
 *                 type: integer
 *                 description: ID of the review to check
 *     responses:
 *       200:
 *         description: Returns a boolean indicating if the review is saved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSaved:
 *                   type: boolean
 *       500:
 *         description: Error checking saved review status
 */

/**
 * @swagger
 * /api/saved-items/save/book:
 *   post:
 *     summary: Save a book for a user
 *     tags: [Saved Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: User's authentication token
 *               relevant_id:
 *                 type: integer
 *                 description: ID of the book to be saved
 *     responses:
 *       200:
 *         description: Successfully saved book
 *       500:
 *         description: Error saving book
 */

/**
 * @swagger
 * /api/saved-items/save/profile:
 *   post:
 *     summary: Save a profile for a user
 *     tags: [Saved Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: User's authentication token
 *               relevant_id:
 *                 type: integer
 *                 description: ID of the profile to be saved
 *     responses:
 *       200:
 *         description: Successfully saved profile
 *       500:
 *         description: Error saving profile
 */

/**
 * @swagger
 * /api/saved-items/remove/book:
 *   post:
 *     summary: Remove a saved book for a user
 *     tags: [Saved Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: User's authentication token
 *               relevant_id:
 *                 type: integer
 *                 description: ID of the saved book to remove
 *     responses:
 *       200:
 *         description: Successfully removed saved book
 *       500:
 *         description: Error removing saved book
 */

/**
 * @swagger
 * /api/saved-items/remove/profile:
 *   post:
 *     summary: Remove a saved profile for a user
 *     tags: [Saved Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: User's authentication token
 *               relevant_id:
 *                 type: integer
 *                 description: ID of the saved profile to remove
 *     responses:
 *       200:
 *         description: Successfully removed saved profile
 *       500:
 *         description: Error removing saved profile
 */

/**
 * @swagger
 * /api/saved-items/profiles/is-saved:
 *   post:
 *     summary: Check if a profile is saved by a user
 *     tags: [Saved Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: User's authentication token
 *               relevant_id:
 *                 type: integer
 *                 description: ID of the profile to check
 *     responses:
 *       200:
 *         description: Returns a boolean indicating if the profile is saved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSaved:
 *                   type: boolean
 *       500:
 *         description: Error checking saved profile status
 */
