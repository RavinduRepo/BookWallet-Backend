const db = require("../../config/dbConfig"); // Import mock db config
const { addBook } = require("../../services/addBookService"); // Import the addBook service to test

jest.mock("../../config/dbConfig"); // Mock the database

describe("addBook Service", () => {
  const mockBook = {
    title: "Sample Book",
    ISBN10: "1234567890",
    ISBN13: "1234567890123",
    publication_date: "2024-10-01",
    description: "A sample book description.",
    author: "John Doe",
    rating: 4.5,
    pages: 300,
    genre: "Fiction",
    imageUrl: "http://example.com/image.jpg",
    resource: "eBook"
  };

  it("should insert a new book and return the book ID when the book does not exist", async () => {
    // Mock the database to return no existing book
    db.query.mockResolvedValueOnce([[]]); // No book found in check query
    // Mock the insertion of the new book and return the insertId
    db.query.mockResolvedValueOnce([{ insertId: 101, affectedRows: 1 }]); // New book inserted

    // Call the addBook service
    const result = await addBook(mockBook);

    // Expect the result to be the newly inserted book's ID
    expect(result).toBe(101);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [
      mockBook.title,
      mockBook.ISBN10,
      mockBook.ISBN13,
      mockBook.publication_date,
      mockBook.description,
      mockBook.author,
      mockBook.rating,
      mockBook.pages,
      mockBook.genre,
      mockBook.imageUrl,
      mockBook.resource
    ]);
  });

  it("should return the existing book ID when the book already exists", async () => {
    // Mock the database to return an existing book with book_id 200
    db.query.mockResolvedValueOnce([[{ book_id: 200 }]]); // Book found

    // Call the addBook service
    const result = await addBook(mockBook);

    // Expect the result to be the existing book's ID
    expect(result).toBe(200);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [mockBook.ISBN10, mockBook.ISBN13, mockBook.title]);
  });

  it("should throw an error when the insert operation fails", async () => {
    // Mock the database to return no existing book
    db.query.mockResolvedValueOnce([[]]); // No book found in check query
    // Mock the insertion failure (affectedRows = 0)
    db.query.mockResolvedValueOnce([{ affectedRows: 0 }]); // Failed to insert book

    // Call the addBook service and expect it to throw
    await expect(addBook(mockBook)).rejects.toThrow("Failed to insert the book.");
  });

  it("should handle database errors and throw an error message", async () => {
    // Mock the database to throw an error during the query
    db.query.mockRejectedValueOnce(new Error("Database error"));

    // Call the addBook service and expect it to throw
    await expect(addBook(mockBook)).rejects.toThrow("Database error: Database error");

    expect(db.query).toHaveBeenCalledWith(expect.any(String), [mockBook.ISBN10, mockBook.ISBN13, mockBook.title]);
  });
});
