const db = require("../../config/dbConfig");
const { getTrendingBooks } = require("../../services/trendingService"); // Adjust path if necessary

jest.mock("../../config/dbConfig"); // Mock db module

describe("Trending Service - getTrendingBooks", () => {
  it("should return trending books when data exists", async () => {
    // Mocked data to be returned by db.query
    const mockTrendingBooksData = [
      {
        title: "Test Book Title",
        ISBN10: "1234567890",
        ISBN13: "1234567890123",
        publication_date: "2024-01-01",
        description: "This is a test description",
        pages: 350,
        author: "Test Author",
        rating: 4.5,
        genre: "Fiction",
        imageUrl: "test-image-url",
        resource: "test-resource-url",
      },
    ];

    // Mock db.query to return the mock data
    db.query.mockResolvedValue([mockTrendingBooksData]);

    // Call the service function
    const result = await getTrendingBooks();

    // Verify the returned result
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      title: "Test Book Title",
      ISBN10: "1234567890",
      ISBN13: "1234567890123",
      publication_date: "2024-01-01",
      description: "This is a test description",
      pages: 350,
      author: "Test Author",
      rating: 4.5,
      genre: "Fiction",
      imageUrl: "test-image-url",
      resource: "test-resource-url",
    });
  });

  it("should return an empty array when no trending books are found", async () => {
    // Mock db.query to return an empty array
    db.query.mockResolvedValue([[]]);

    // Call the service function
    const result = await getTrendingBooks();

    // Expect an empty array
    expect(result).toEqual([]);
  });

  it("should handle database errors gracefully", async () => {
    // Mock db.query to throw an error
    db.query.mockRejectedValue(new Error("Database error"));

    // Call the service function and expect it to throw an error
    await expect(getTrendingBooks()).rejects.toThrow("Error fetching trending books: Database error");
  });
});
