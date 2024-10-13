// Importing necessary services for authentication and user management
const authService = require('../services/authService');
const userService = require('../services/userServices');
const captchaService = require('../services/captchaService');

// Sign up function to create a new user
const signUp = async (req, res) => {
    try {
        console.log("Signup requested");

        // Destructure the request body to get user details and recaptcha token
        const { username, email, password, imageUrl, description, recaptchaToken } = req.body;

        // Check if the recaptcha token is provided
        if (!recaptchaToken) {
            return res.status(400).json({ message: 'Captcha token is missing' });
        }

        // Verify the recaptcha token and get the score
        const recaptchaScore = await captchaService.verifyRecaptcha(recaptchaToken);
        console.log(recaptchaScore);

        // Check if the recaptcha verification failed due to invalid token
        if (recaptchaScore === null) {
            return res.status(400).json({ message: 'Captcha verification failed due to invalid token' });
        }

        // Check if the recaptcha score is below the threshold
        if (recaptchaScore < 0.5) {
            return res.status(400).json({ message: 'Captcha verification failed' });
        }

        // Call the signUp method from authService to create a new user
        const user = await authService.signUp(username, email, password, imageUrl, description);
        console.log("User created");

        // Respond with success message and user details
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        // Handle errors and respond with a server error message
        console.error("Error during sign up:", error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
};

// Sign in function to authenticate a user
const signIn = async (req, res) => {
    try {
        // Destructure email and password from request body
        const { email, password } = req.body;

        // Call the signIn method from authService to authenticate the user and get a token
        const token = await authService.signIn(email, password);
        const decoded = await authService.verifyToken(token);
        const userId = decoded.id;

        // Get user details using userId
        const user = await userService.getUserDetails(userId);

        // Check if user exists and respond accordingly
        if (user) {
            res.status(200).json({ message: 'User signed in successfully', token, userId: user.user_id, username: user.username, email: user.email, imageUrl: user.imageUrl, description: user.description });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        // Handle errors during sign in
        res.status(400).json({ error: error.message });
    }
};

// Function to handle protected routes that require token verification
const handleToken = async (req, res) => {
    const token = req.headers['authorization']; // Retrieve token from authorization header
    if (!token) return res.status(403).send('Token is required'); // Check if token is provided

    try {
        // Verify the token and retrieve userId
        const decoded = await authService.verifyToken(token);
        const userId = decoded.id;
        const user = await userService.getUserDetails(userId); // Get user details

        // Respond with user details if found
        if (user) {
            res.status(200).json({ userId: user.user_id, username: user.username, email: user.email, imageUrl: user.imageUrl, description: user.description });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        // Handle errors during token verification
        res.status(401).send('Invalid token');
    }
};

// Function to verify and update user details
const verifyUpdateDetails = async (req, res) => {
    // Destructure user details and token from request body
    const { username, email, password, description, token } = req.body;
    
    // Verify the token to get userId
    const decoded = await authService.verifyToken(token);
    const userIdToken = decoded.id.toString();

    try {
        const userId = req.params.id; // Get userId from request parameters

        // Check if the userId from token matches the userId from params
        if (userIdToken !== userId) {
            return res.status(403).json({ error: 'Unauthorized action' });
        }       

        // Call authService to update user details
        const user = await authService.verifyUpdateDetails(username, email, password, description, userId);

        // Respond with success message
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        // Handle errors during the update process
        res.status(400).json({ error: error.message });
    }
};

// Exporting the functions to be used in other parts of the application
module.exports = { signUp, signIn, handleToken, verifyUpdateDetails };
