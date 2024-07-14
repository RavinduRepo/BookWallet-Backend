const authService = require('../services/authService');

exports.signUp = async (req, res) => {
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

exports.signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await authService.signIn(email, password);
        res.status(200).json({ message: 'User signed in successfully', token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
