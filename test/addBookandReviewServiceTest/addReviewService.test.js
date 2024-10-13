const db = require("../../config/dbConfig"); // Mock the db config
const { addReview } = require("../../services/addReviewService"); // Import the service to test
const ratingService = require("../../services/bookRatingService"); // Mock the rating service

jest.mock("../../config/dbConfig"); // Mock the database module
jest.mock("../../services/bookRatingService"); // Mock the rating service

describe("addReview Service", () => {
  const mockReview = {
    user_id: 1,
    context: "Great book!",
    rating: 4.5,
    group_id: 101,
  };
  const bookId = 5;

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it("should add a review when the user exists and return true", async () => {
    // Mock addBookRatingService to return 1 affected row (successful rating addition)
    ratingService.addBookRatingService.mockResolvedValue(1);
    // Mock db.query to return an existing user
    db.query.mockResolvedValueOnce([[{ user_id: mockReview.user_id }]]); // User exists
    // Mock successful review insertion
    db.query.mockResolvedValueOnce([{ affectedRows: 1 }]); // Review added

    // Call the addReview service
    const result = await addReview(mockReview, bookId);

    // Expectations
    expect(result).toBe(true); // Review successfully added
    expect(ratingService.addBookRatingService).toHaveBeenCalledWith(mockReview, bookId);
    expect(db.query).toHaveBeenCalledTimes(2); // Check user and insert review
    expect(db.query).toHaveBeenCalledWith("SELECT user_id FROM user WHERE user_id = ?", [mockReview.user_id]);
  });

  it("should return the result of addBookRatingService if review context is empty", async () => {
    // Set context to empty string
    const mockReviewWithEmptyContext = { ...mockReview, context: "" };
    // Mock addBookRatingService to return affected rows
    ratingService.addBookRatingService.mockResolvedValue(1);

    // Call the addReview service
    const result = await addReview(mockReviewWithEmptyContext, bookId);

    // Expectations
    expect(result).toBe(1); // Should return the result from addBookRatingService
    expect(ratingService.addBookRatingService).toHaveBeenCalledWith(mockReviewWithEmptyContext, bookId);
    expect(db.query).not.toHaveBeenCalled(); // No DB query if context is empty
  });

  it("should throw an error if the user does not exist", async () => {
    // Mock addBookRatingService to return 1 affected row
    ratingService.addBookRatingService.mockResolvedValue(1);
    // Mock db.query to return an empty array (user does not exist)
    db.query.mockResolvedValueOnce([[]]);

    // Call the addReview service and expect it to throw
    await expect(addReview(mockReview, bookId)).rejects.toThrow("User does not exist.");

    // Expectations
    expect(ratingService.addBookRatingService).toHaveBeenCalledWith(mockReview, bookId);
    expect(db.query).toHaveBeenCalledWith("SELECT user_id FROM user WHERE user_id = ?", [mockReview.user_id]);
  });

  it("should handle database errors and throw an error message", async () => {
    // Mock addBookRatingService to return 1 affected row
    ratingService.addBookRatingService.mockResolvedValue(1);
    // Mock db.query to throw an error
    db.query.mockRejectedValueOnce(new Error("Database error"));

    // Call the addReview service and expect it to throw
    await expect(addReview(mockReview, bookId)).rejects.toThrow("Database error: Database error");

    // Expectations
    expect(ratingService.addBookRatingService).toHaveBeenCalledWith(mockReview, bookId);
    expect(db.query).toHaveBeenCalledWith("SELECT user_id FROM user WHERE user_id = ?", [mockReview.user_id]);
  });
});
