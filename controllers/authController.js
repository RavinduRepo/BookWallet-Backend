const authService = require('../services/authService');

const signUp = async (req, res) => {
    try {
        console.log("signup requested");
        const { username, email, password } = req.body;
        const user = await authService.signUp(username, email, password);
        console.log("user created");
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await authService.signIn(email, password);
        res.status(200).json({ message: 'User signed in successfully', token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const checkToken = (req, res) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Token is required');
    // err = authService.verifyToken(token);
    authService.verifyToken(token, res);
    // req.userId = decoded.id;
};

const verifyUpdateDetails = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userId = req.params.id;
        const user = await authService.verifyUpdateDetails(username, email, password, userId);
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {signUp, signIn, checkToken, verifyUpdateDetails};
