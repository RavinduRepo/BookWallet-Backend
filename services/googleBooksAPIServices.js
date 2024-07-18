const axios = require('axios');
const Book = require('../models/googleBookModel'); // Ensure correct path to googleBook.js

// Google Books API endpoint
const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';

const googleAPISearch = async (req, res) => {
    const { query, index } = req.query;

    if (!query || !index) {
        return res.status(400).send('Query and index are required');
    }

    try {
        const response = await axios.get(GOOGLE_BOOKS_API, {
            params: {
                q: query,
                startIndex: (index - 1) * 10,
                maxResults: 10 // Example: Fetching 5 results per page
            }
        });

        const books = response.data.items.map(item => new Book(item)); // Assuming items is an array of book objects
        const replylist = [];

        books.forEach(book => {
            replylist.push({
                title: book.volumeInfo.title,
                author: book.volumeInfo.authors.join(', '), // Join authors into a string
                pages: book.volumeInfo.pageCount,
                genre: book.volumeInfo.categories.join(', '),
                totalRating: '--', // change to actual rating
                imageUrl: book.volumeInfo.imageLinks.thumbnail,
                description: book.volumeInfo.description
    
            });
        });
        console.log("requesting: " , replylist);

        res.json(replylist);
    } catch (error) {
        console.error('Error fetching data from Google Books API:', error);
        res.status(500).send('Error fetching data from Google Books API');
    }
}

module.exports = { googleAPISearch };
