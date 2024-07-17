const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Get user details
router.get("/users/:id", userController.getUserDetails);

// Update username
router.put("/users/:id/username", async (req, res) => {
  try {
    const result = await userController.updateUsername(
      req.params.id,
      req.body.username
    );
    if (result[0].affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Username updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update email
router.put("/users/:id/email", async (req, res) => {
  try {
    const result = await userController.updateEmail(
      req.params.id,
      req.body.email
    );
    if (result[0].affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Email updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update password
router.put("/users/:id/password", async (req, res) => {
  try {
    const result = await userController.updatePassword(
      req.params.id,
      req.body.password
    );
    if (result[0].affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update all details
router.put("/users/:id/all", async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email, password } = req.body;

    let updateResults = [];

    if (username) {
      const usernameResult = await userController.updateUsername(
        userId,
        username
      );
      updateResults.push(usernameResult);
    }
    if (email) {
      const emailResult = await userController.updateEmail(userId, email);
      updateResults.push(emailResult);
    }
    if (password) {
      const passwordResult = await userController.updatePassword(
        userId,
        password
      );
      updateResults.push(passwordResult);
    }

    const anyUpdatesFailed = updateResults.some(
      (result) => result[0].affectedRows === 0
    );

    if (anyUpdatesFailed) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User details updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
