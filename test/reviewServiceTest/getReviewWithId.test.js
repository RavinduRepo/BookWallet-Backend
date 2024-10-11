const { getReviewWithId } = require("../../services/reviewService"); // Adjust path to your service file
const db = require("../../config/dbConfig"); // Mock the db module

///Run npm test command it can be run all test  files
///if you need to run specific test file
///  ex :   npx jest getReviewWithId.test.js
/// There is serveral methods to this

jest.mock("../../config/dbConfig"); // Mock the db module

describe("getReviewWithId Service", () => {
  it("should return review details mapped to the Post model when data exists", async () => {
    // Mocked data to be returned by db.execute
    const mockReviewData = [
      {
        review_id: 1,
        book_id: 35,
        user_id: 77,
        imageUrl: "test-image-url", // Matches the field in your SQL query
        title: "Test Book Title",
        author: "Test Author",
        context: "Great book!",
        rating: 5,
        date: "2024-08-12",
        username: "testuser",
        likesCount: 10,
        commentsCount: 5,
        sharesCount: 3,
      },
    ];

    // Mock the db.execute function to return the mock data
    db.execute.mockResolvedValue([mockReviewData]);

    // Call the service function
    const result = await getReviewWithId(1);

    // Verify the returned result
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      reviewId: 1,
      bookId: 35,
      userId: 77,
      imagePath: "test-image-url", // Field names must match the constructor parameters in Post class
      bookName: "Test Book Title",
      authorName: "Test Author",
      context: "Great book!",
      rating: 5,
      date: "2024-08-12",
      reviwerName: "testuser",
      likesCount: 10,
      commentsCount: 5,
      sharesCount: 3,
    });
  });

  it("should return an empty array when no review is found", async () => {
    // Mock db.execute to return an empty array
    db.execute.mockResolvedValue([[]]);

    // Call the service function
    const result = await getReviewWithId(999); // Pass a reviewId that doesn't exist

    // Expect an empty array
    expect(result).toEqual([]);
  });

  it("should handle database errors gracefully", async () => {
    // Mock db.execute to throw an error
    db.execute.mockRejectedValue(new Error("Database error"));

    // Call the service function and expect it to throw an error
    await expect(getReviewWithId(1)).rejects.toThrow("Database error");
  });
});
