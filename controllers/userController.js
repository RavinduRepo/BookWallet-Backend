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
    const [rows] = await db.execute("SELECT * FROM user WHERE user_id = ?", [
      userId,
    ]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Database error", error: err });
  }
};

const updateUsername = (userId, username) => {
  return db.query("UPDATE user SET username = ? WHERE user_id = ?", [
    username,
    userId,
  ]);
};

const updateEmail = (userId, email) => {
  return db.query("UPDATE user SET email = ? WHERE user_id = ?", [
    email,
    userId,
  ]);
};

const updatePassword = (userId, password) => {
  return db.query("UPDATE user SET password = ? WHERE user_id = ?", [
    password,
    userId,
  ]);
};

module.exports = {
  createUser,
  findUserByEmail,
  getUserDetails,
  updateUsername,
  updateEmail,
  updatePassword,
};
