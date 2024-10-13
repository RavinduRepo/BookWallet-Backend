const db = require("../../config/dbConfig");
const { getWishlistByUserId } = require("../../services/wishlistService"); 

jest.mock("../../config/dbConfig");; // Mock the db module

describe("getWishlistByUserId Service", () => {
  it("should return wishlist details when data exists", async () => {
    // Mocked data to be returned by db.query
    const mockWishlistData = [
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
    db.query.mockResolvedValue([mockWishlistData]);

    // Call the service function
    const result = await getWishlistByUserId(77);

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

  it("should return an empty array when no wishlist items are found", async () => {
    // Mock db.query to return an empty array
    db.query.mockResolvedValue([[]]);

    // Call the service function
    const result = await getWishlistByUserId(999); // Pass a userId that doesn't exist

    // Expect an empty array
    expect(result).toEqual([]);
  });

  it("should handle database errors gracefully", async () => {
    // Mock db.query to throw an error
    db.query.mockRejectedValue(new Error("Database error"));

    // Call the service function and expect it to throw an error
    await expect(getWishlistByUserId(77)).rejects.toThrow("Error fetching wishlist: Database error");
  });
});
