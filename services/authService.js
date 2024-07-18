const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../controllers/userController');
const { signupDetailsSchema } = require('../middlewares/authMiddleware');

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
    console.log("logint", await bcrypt.hash(password, 10),user.password);
        
        throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });
    return token;
};

module.exports = { signUp, signIn };
