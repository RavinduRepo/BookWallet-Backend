const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Get user details
router.get("/getuserdetails/:id", userController.getUserDetails);
router.get("/getuserprofile/:id", userController.getUserProfile);

// Update username
router.put("/updateusername/:id", userController.updateUsername);

// Update email
router.put("/updateemail/:id", userController.updateEmail);

// Update password
router.put("/updatepassword/:id", userController.updatePassword);

// Update description
router.put("/updatedescription/:id", userController.updateDescription);

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: User
 *  description: The user managing API
 */

/**
 * @swagger
 * /api/user/getuserdetails/{id}:
 *  get:
 *      summary: Get user details by id
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: The user id
 *      responses:
 *          200:
 *              description: User details
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/User'
 *          404:
 *              description: User not found
 *          500:
 *              description: Database error
 */
