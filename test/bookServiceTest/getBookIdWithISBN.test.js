const db = require("../../config/dbConfig"); // Import mock db config
const { getBookIdWithISBN } = require("../../services/bookService"); // Import service to test
const Book = require("../../models/bookModel");

jest.mock("../../config/dbConfig"); // Mock the database

describe("getBookIdWithISBN Service", () => {

    it("should return an array of Book instances if a valid ISBN is provided", async () => {
        // Mock a successful database response with one book found
        const mockResults = [
            { book_id: 1 }
        ];
        db.execute.mockResolvedValue([mockResults]);

        // Call the service function
        const result = await getBookIdWithISBN("1234567890");

        // Expect the result to be an array of Book instances
        expect(result).toEqual([new Book(1)]);
    });

    it("should return an empty array if no book matches the provided ISBN", async () => {
        // Mock an empty result set from the database
        db.execute.mockResolvedValue([[]]);

        // Call the service function with an invalid ISBN
        const result = await getBookIdWithISBN("invalidISBN");

        // Expect the result to be an empty array
        expect(result).toEqual([]);
    });

    it("should handle errors and throw an error message", async () => {
        // Mock a database error
        db.execute.mockRejectedValue(new Error("Database error"));

        // Call the service function and expect it to throw
        await expect(getBookIdWithISBN("1234567890")).rejects.toThrow("Server error while fetching book Id");
    });
});
