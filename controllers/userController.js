const db = require("../config/dbConfig");
const services = require("../services/userServices");
const authService = require("../services/authService");

const createUser = async (username, email, password, imageUrl, description) => {
  const sql =
    "INSERT INTO user (username, email, password, imageUrl, description) VALUES (?, ?, ?, ?, ?)";
  const [result] = await db.execute(sql, [
    username,
    email,
    password,
    imageUrl,
    description,
  ]);
  console.log("logint", result);

  return result.insertId;
};

const findUserByEmail = async (email) => {
  const sql = "SELECT * FROM user WHERE email = ?";
  const [rows] = await db.execute(sql, [email]);
  return rows[0];
};

// // Controller to get user details by userId
// const getUserDetails = async (req, res) => {
//   // Parse the userId from the request parameters
//   const userId = parseInt(req.params.id);

//   try {
//     // Call service to get the user's profile data
//     const user = await services.getUserProfile(userId);

//     // If user exists, return the user data
//     if (user) {
//       res.json(user);
//     } else {
//       // If user not found, return a 404 error
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (err) {
//     // Return a 500 error if there is a database error
//     res.status(500).json({ message: "Database error", error: err });
//   }
// };

// Controller to update a user's username
const updateUsername = async (req, res) => {
  // Get userId from request parameters and username from request body
  const userId = req.params.id;
  const username = req.body.username;

  try {
    // SQL query to update username for a specific user
    const sql = "UPDATE user SET username = ? WHERE user_id = ?";
    const [result] = await db.execute(sql, [username, userId]);

    // If no rows were affected, user was not found, return 404 error
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return success message after updating username
    res.json({ message: "Username updated successfully" });
  } catch (err) {
    // Log error and return 500 status if there is a server error
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Controller to update a user's email
const updateEmail = async (req, res) => {
  // Get userId from request parameters and email from request body
  const userId = req.params.id;
  const email = req.body.email;

  try {
    // SQL query to update email for a specific user
    const sql = "UPDATE user SET email = ? WHERE user_id = ?";
    const [result] = await db.execute(sql, [email, userId]);

    // If no rows were affected, user was not found, return 404 error
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return success message after updating email
    res.json({ message: "Email updated successfully" });
  } catch (err) {
    // Log error and return 500 status if there is a server error
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Controller to update a user's password
const updatePassword = async (req, res) => {
  // Get userId from request parameters and password from request body
  const userId = req.params.id;
  const password = req.body.password;

  try {
    // SQL query to update password for a specific user
    const sql = "UPDATE user SET password = ? WHERE user_id = ?";
    const [result] = await db.execute(sql, [password, userId]);

    // If no rows were affected, user was not found, return 404 error
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return success message after updating password
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    // Log error and return 500 status if there is a server error
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Controller to update a user's description
const updateDescription = async (req, res) => {
  // Get userId from request parameters and description from request body
  const userId = req.params.id;
  const description = req.body.description;

  try {
    // SQL query to update description for a specific user
    const sql = "UPDATE user SET description = ? WHERE user_id = ?";
    const [result] = await db.execute(sql, [description, userId]);

    // If no rows were affected, user was not found, return 404 error
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return success message after updating description
    res.json({ message: "Description updated successfully" });
  } catch (err) {
    // Log error and return 500 status if there is a server error
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


const updateAllDetails = async (
  username,
  email,
  password,
  description,
  userId
) => {
  const sql =
    "UPDATE user SET username = ?, email = ?, password = ?, description = ? WHERE user_id = ?";
  await db.execute(sql, [username, email, password, description, userId]);
};

const getUserProfile = async (req, res) => {
  const userId = parseInt(req.params.id);  // Extract and convert userId from request parameters
  const token = req.headers.authorization; // Get the authorization token from the request headers

  try {
    // Verify the provided token and decode it to get the logged-in user's ID
    const decoded = await authService.verifyToken(token);
    const loggedInUserId = decoded.id;

    // Call the service to fetch the user profile based on the userId and the logged-in user's ID
    const user = await services.getUserProfile(userId, loggedInUserId);

    // Check if the user exists and respond accordingly
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    // Handle any errors and return a 500 Internal Server Error with the error message
    res.status(500).json({ message: "Database error", error: err.message });
  }
};


module.exports = {
  createUser,
  findUserByEmail,
  updateUsername,
  updateEmail,
  updatePassword,
  updateDescription,
  updateAllDetails,
  getUserProfile,
};
