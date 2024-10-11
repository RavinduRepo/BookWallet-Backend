const express = require("express");
const router = express.Router();
const storeController = require("../store_management/storeManagingController");

/**
 * @swagger
 * tags:
 *   name: Store
 *   description: Locations of books
 */

/**
 * @swagger
 * /api/stores/book/{bookId}:
 *   get:
 *     summary: Get stores by bookId
 *     tags: [Store]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the book
 *     responses:
 *       200:
 *         description: A list of stores for the specified book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 stores:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Store'
 *       404:
 *         description: No shops found for the given bookId
 *       500:
 *         description: Server error
 */

// Route to get shops by bookId
router.get("/book/:bookId", storeController.getShopsByBookId);

module.exports = router;
