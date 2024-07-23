const pool = require('./storedbconfig');

const storeDetails = (req, res) => {
    const { storeName, webLink, contactNo } = req.body;
    if (!storeName || !webLink || !contactNo) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Insert the data into the database
    pool.query('INSERT INTO publisher (storeName, webLink, contactNo) VALUES (?, ?, ?)', [storeName, webLink, contactNo], (error, results) => {
        if (error) {
            console.error('Error inserting data:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json({ message: 'Data submitted successfully!' });
    });
};

const bookDetails = (req, res) => {
    const { title, isbn, price, quantity } = req.body;
    if (!title || !isbn || !price || !quantity) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Insert the data into the database
    pool.query('INSERT INTO books (title, isbn, price, quantity) VALUES (?, ?, ?, ?)', [title, isbn, price, quantity], (error, results) => {
        if (error) {
            console.error('Error inserting data:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json({ message: 'Data submitted successfully!' });
    });
};

module.exports = { storeDetails, bookDetails };
