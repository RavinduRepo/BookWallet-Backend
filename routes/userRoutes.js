const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Get user details
router.get("/getuserdetails/:id", userController.getUserDetails);

// Update username
router.put("/updateusername/:id", userController.updateUsername);

// Update email
router.put("/updateemail/:id", userController.updateEmail);

// Update password
router.put("/updatepassword/:id", userController.updatePassword);

module.exports = router;



// router.put("/edituserdetails/:id", async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const { username, email, password } = req.body;

//     let updateResults = [];

//     if (username) {
//       const usernameResult = await userController.updateUsername(
//         userId,
//         username
//       );
//       updateResults.push(usernameResult);
//     }
//     if (email) {
//       const emailResult = await userController.updateEmail(userId, email);
//       updateResults.push(emailResult);
//     }
//     if (password) {
//       const passwordResult = await userController.updatePassword(
//         userId,
//         password
//       );
//       updateResults.push(passwordResult);
//     }

//     const anyUpdatesFailed = updateResults.some(
//       (result) => result[0].affectedRows === 0
//     );

//     if (anyUpdatesFailed) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json({ message: "User details updated successfully" });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });