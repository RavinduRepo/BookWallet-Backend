const express = require('express');
const app = express();
const {loginDetailsShema} = require('../middlewares/authMiddleware');
const {db} = require('../config/database');

app.use(express.json());

const port = process.env.PORT || 2000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// Array to store login details
const loginDetails = [];

// POST method for checking the authentication of username, password, email
app.post('/api/loginDetails', (req, res) => {
    // Validate the request body against the schema
    const { error } = loginDetailsShema.validate(req.body);
    if (error) {
        // If validation fails, send a 400 status code and the validation error message
        return res.status(400).send(error.details[0].message);
    }

    // Create a login detail object with the validated data
    const loginDetail = {
        user_id: loginDetails.length + 1, // Incremental ID
        username: req.body.username, // Use validated username
        password: req.body.password, // Use validated password
        email: req.body.email // Use validated email
    };

    // Prepare user data for the database
    let user = {username:req.body.username, password:req.body.password, email:req.body.email};
    let sql = 'INSERT INTO user SET ?';

    // Insert the user into the database
    db.query(sql, user, (err, result) => {
        if (err) return next(err);
        res.send(loginDetail);
    });
    console.log("User added to the database and array");

    // Add the new login detail to the array
    loginDetails.push(loginDetail);

    // Send the new login detail as the response
    // res.send(loginDetail);
});
