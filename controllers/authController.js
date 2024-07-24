const authService = require('../services/authService');
const userService = require('../services/userServices');

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
        const decoded = await authService.verifyToken(token);
        const userId = decoded.id;
        const user = await userService.getUserDetails(userId);

        if (user) {
            res.status(200).json({ message: 'User signed in successfully', token, userId: user.user_id, username: user.username, email: user.email });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const handleToken = async (req, res) => {
    console.log("reached protected");
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Token is required');

    try {
        const decoded = await authService.verifyToken(token);
        const userId = decoded.id;
        const user = await userService.getUserDetails(userId);

        if (user) {
            res.status(200).json({ userId: user.user_id, username: user.username, email: user.email });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        res.status(401).send('Invalid token');
    }
};

const verifyUpdateDetails = async (req, res) => {
    console.log("reached to edit");
    try {
        const { username, email, password } = req.body;
        const userId = req.params.id;
        const user = await authService.verifyUpdateDetails(username, email, password, userId);
        console.log("updated the user");
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {signUp, signIn, handleToken, verifyUpdateDetails};
