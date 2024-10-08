const axios = require("axios");
const Book = require("../models/googleBookModel"); // Ensure correct path to googleBook.js
const dotenv = require("dotenv");

dotenv.config();
// Google Books API endpoint
const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes";

const googleAPISearch = async (req, res) => {
  const { query, index } = req.query;

  if (!query || !index) {
    return res.status(400).send("Query and index are required");
  }

  try {
    const response = await axios.get(GOOGLE_BOOKS_API, {
      params: {
        q: query,
        startIndex: (index - 1) * 10,
        maxResults: 10, // Example: Fetching 10 results per page
        printType: "books", // Ensure only books are returned
        key: process.env.KEY
      },
    });

    const booksWithISBN = response.data.items.filter(item => {
      const industryIdentifiers = item.volumeInfo.industryIdentifiers || [];
      return industryIdentifiers.some(identifier => 
        identifier.type === "ISBN_10" || identifier.type === "ISBN_13"
      );
    });

    const books = booksWithISBN.map(item => new Book(item)); // Assuming items is an array of book objects
    const replylist = [];

    books.forEach(book => {
      const industryIdentifiers = book.volumeInfo.industryIdentifiers || [];

      // Separate ISBN10 and ISBN13
      const ISBN10 =
        industryIdentifiers.find(identifier => identifier.type === "ISBN_10")
          ?.identifier || "N/A";
      const ISBN13 =
        industryIdentifiers.find(identifier => identifier.type === "ISBN_13")
          ?.identifier || "N/A";

      replylist.push({
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors
          ? book.volumeInfo.authors.join(", ")
          : "N/A", // Join authors into a string
        pages: book.volumeInfo.pageCount || 0,
        genre: book.volumeInfo.categories
          ? book.volumeInfo.categories.join(", ")
          : "N/A",
        ISBN10: ISBN10,
        ISBN13: ISBN13,
        publishedDate: book.volumeInfo.publishedDate || "N/A", // Handle missing dates
        totalRating: book.volumeInfo.averageRating || 0, // Update with actual rating
        imageUrl: book.volumeInfo.imageLinks
          ? book.volumeInfo.imageLinks.thumbnail
          : "N/A",
        description: book.volumeInfo.description || "",
        resource: "Google",
      });
    });

    console.log("requesting: ", replylist);

    res.json(replylist);
  } catch (error) {
    console.error("Error fetching data from Google Books API:", error);
    res.status(500).send("Error fetching data from Google Books API");
  }
};

module.exports = { googleAPISearch };
