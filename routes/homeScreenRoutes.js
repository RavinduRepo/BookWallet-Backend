const express = require('express');
const router = express.Router();
const homeScreenController = require('../controllers/homeScreenController');

router.get('/getHomeScreen/:userId', homeScreenController.getHomeScreen);
module.exports = router;

/**
 * @swagger
 * tags:
 *  name: Home Screen
 *  description: The home screen that include books, reviews and shares
 */

/**
 * @swagger
 * /api/home-screen/getHomeScreen/{userId}:
 *  get:
 *      summary: Get home screen by userId
 *      tags: [Home Screen]
 *      parameters:
 *          - in: path
 *            name: userId
 *            schema:
 *              type: integer
 *            required: true
 *            description: The ID of the user
 *          - in: query
 *            name: page
 *            schema:
 *              type: integer
 *            required: true
 *            description: Limit the number of fetched data
 *      responses:
 *          200:
 *              description: Home screen details
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              books:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Book'
 *                              reviews:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Review'
 *                              shares:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Share'
 *          500:
 *              description: Server error
 */
