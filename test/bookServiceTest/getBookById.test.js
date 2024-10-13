const db = require("../../config/dbConfig"); // Import mock db config
const { getBookById } = require("../../services/bookService"); // Import service to test

jest.mock("../../config/dbConfig"); // Mock the database

describe("getBookById Service", () => {

    it("should return the book details if a valid bookId is provided", async () => {
        // Mock a successful database response
        const mockBook = [
            {
                book_id: 1,
                title: "Test Book",
                ISBN10: "1234567890",
                ISBN13: "1234567890123",
                publication_date: "2023-01-01",
                description: "A test book description",
                author: "Test Author",
                rating: 4.5,
                genre: "Fiction",
                imageUrl: "http://example.com/image.jpg",
                resource: "http://example.com/resource.pdf"
            }
        ];
        db.execute.mockResolvedValue([mockBook]); // Mock resolved value

        // Call the service function
        const result = await getBookById(1);

        // Expect the result to match the mock book details
        expect(result).toEqual(mockBook);
    });

    it("should return an empty array if no book is found", async () => {
        // Mock an empty result set from the database
        db.execute.mockResolvedValue([[]]);

        // Call the service function with an invalid book ID
        const result = await getBookById(999);

        // Expect the result to be an empty array
        expect(result).toEqual([]);
    });

    it("should handle errors and throw an error message", async () => {
        // Mock a database error
        db.execute.mockRejectedValue(new Error("Database error"));

        // Call the service function and expect it to throw
        await expect(getBookById(1)).rejects.toThrow("Database error");
    });
});
