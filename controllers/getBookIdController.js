const { addBook } = require("../services/addBookService"); // Importing the addBook service

const getBookIdController = async (req, res) => {
    const { book } = req.body; // Destructuring to extract 'book' from the request body

    // Check if 'book' is provided in the request body
    if (!book) {
        return res
          .status(400) // Send a 400 status if 'book' is missing
          .json({ message: "Book details are required" });
    }

    try {
        // Call the addBook service to add the book and retrieve its ID
        const bookId = await addBook(book);
        console.log(bookId); // Log the book ID for debugging purposes

        // Send a successful response with the book ID
        res.status(200).json({ bookId });
    } catch (error) {
        // Send a 500 status with the error message if something goes wrong
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getBookIdController }; // Exporting the controller for use in routes
