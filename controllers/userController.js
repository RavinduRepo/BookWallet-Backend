const db = require("../config/dbConfig");

const createUser = async (username, email, password) => {
  console.log("requested:", username, email, password);
  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  const [result] = await db.execute(sql, [username, email, password]);
  console.log("recived", result);
  return result.insertId;
};

const findUserByEmail = async (email) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  const [rows] = await db.execute(sql, [email]);
  return rows[0];
};

const getUserDetails = async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    console.log("calling .getuser");
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

module.exports = { createUser, findUserByEmail, getUserDetails };
