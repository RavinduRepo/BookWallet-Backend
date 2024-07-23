const db = require("../config/dbConfig");

const createUser = async (username, email, password) => {
  const sql = "INSERT INTO user (username, email, password) VALUES (?, ?, ?)";
  const [result] = await db.execute(sql, [username, email, password]);
  console.log("logint", result);

  return result.insertId;
};

const findUserByEmail = async (email) => {
  const sql = "SELECT * FROM user WHERE email = ?";
  const [rows] = await db.execute(sql, [email]);
  return rows[0];
};

const getUserDetails = async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    // console.log("calling .getuser");
    const sql = "SELECT * FROM user WHERE user_id = ?";
    const [rows] = await db.execute(sql, [userId]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Database error", error: err });
  }
};

const updateUsername = async (req, res) => {
  const userId = req.params.id;
  const username = req.body.username;

  try {
    const sql = "UPDATE user SET username = ? WHERE user_id = ?";
    const [result] = await db.execute(sql, [username, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Username updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const updateEmail = async (req, res) => {
  const userId = req.params.id;
  const email = req.body.email;

  try {
    const sql = "UPDATE user SET email = ? WHERE user_id = ?";
    const [result] = await db.execute(sql, [email, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Email updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const updatePassword = async (req, res) => {
  const userId = req.params.id;
  const password = req.body.password;

  try {
    const sql = "UPDATE user SET password = ? WHERE user_id = ?";
    const [result] = await db.execute(sql, [password, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Email updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const updateAllDetails = async (username, email, password, userId) => {
  const sql = "UPDATE user SET username = ?, email = ?, password = ? WHERE user_id = ?";
  await db.execute(sql, [username, email, password, userId]);
};

module.exports = {
  createUser,
  findUserByEmail,
  getUserDetails,
  updateUsername,
  updateEmail,
  updatePassword,
  updateAllDetails
};




// const updateUsername = (userId, username) => {
//   return db.query("UPDATE user SET username = ? WHERE user_id = ?", [
//     username,
//     userId,
//   ]);
// };

// const updateEmail = (userId, email) => {
//   return db.query("UPDATE user SET email = ? WHERE user_id = ?", [
//     email,
//     userId,
//   ]);
// };

// const updatePassword = (userId, password) => {
//   return db.query("UPDATE user SET password = ? WHERE user_id = ?", [
//     password,
//     userId,
//   ]);
// };