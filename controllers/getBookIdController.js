const { addBook } = require("../services/addBookService");

const getBookIdController = async (req, res) => {
    const { book } = req.body;

    if (!book) {
        return res
          .status(400)
          .json({ message: "Book details are required" });
    }

    try {
        const bookId = await addBook(book);
        console.log(bookId);
    res.status(200).json({ bookId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getBookIdController };
