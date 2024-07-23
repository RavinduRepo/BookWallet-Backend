const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail, updateAllDetails } = require('../controllers/userController');
const { signupDetailsSchema, updateDetailsSchema } = require('../middlewares/authMiddleware');

const signUp = async (username, email, password) => {
    // Combine the parameters into an object
    const userDetails = { username, email, password };

    // Validate the request body against the schema
    const { error } = signupDetailsSchema.validate(userDetails);
    if (error) {
        console.log("invalid");
        // If validation fails, send a 400 status code and the validation error message
        throw new Error('Invalid email or password');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await createUser(username, email, hashedPassword);

    return { id: userId, username, email };
};

const signIn = async (email, password) => {
    const user = await findUserByEmail(email);
    if (!user || !await bcrypt.compare(password, user.password)) {
        throw new Error('Invalid email or password');
    }
    const token = jwt.sign({ id: user.user_id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
};

const verifyToken = (token, res) => {
  console.log("calling tolken verify");
  
    jwt.verify(token, process.env.JWT_SECRET, (err,decoded) => {
      if (err) return res.status(401).send('Invalid token');
      // console.log(decoded);
      res.status(200).send('Token valid');
    });
};

const verifyUpdateDetails = async (username, email, password, userId) => {
  // Combine the parameters into an object
  const userDetails = { username, email, password };

  // Validate the request body against the schema
  const { error } = updateDetailsSchema.validate(userDetails);
  if (error) {
      console.log("invalid");
      // If validation fails, send a 400 status code and the validation error message
      throw new Error('Invalid email or password');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await updateAllDetails(username, email, hashedPassword, userId);

  return { userId, username, email };
};

module.exports = { signUp, signIn , verifyToken, verifyUpdateDetails };
