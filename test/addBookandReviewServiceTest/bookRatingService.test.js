const db = require("../../config/dbConfig"); // Mock dbConfig
const { addBookRatingService } = require("../../services/bookRatingService"); // Import the service to test

jest.mock("../../config/dbConfig"); // Mock the database

describe("addBookRatingService", () => {
  const mockReview = {
    user_id: 1,
    rating: 4.5,
  };
  const bookId = 5;

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it("should insert or update a book rating when the user exists", async () => {
    // Mock db query to return a valid user (user exists)
    db.query.mockResolvedValueOnce([[{ user_id: mockReview.user_id }]]);
    // Mock the second query to simulate successful insert/update
    db.query.mockResolvedValueOnce([{ affectedRows: 1 }]);

    // Call the addBookRatingService function
    const result = await addBookRatingService(mockReview, bookId);

    // Expectations
    expect(result).toBe(true); // Rating should be successfully inserted/updated
    expect(db.query).toHaveBeenCalledTimes(2); // First to check user, second to insert/update rating
    expect(db.query).toHaveBeenCalledWith(
      "SELECT user_id FROM user WHERE user_id = ?",
      [mockReview.user_id]
    ); // Verify the user check query
    expect(db.query).toHaveBeenCalledWith(
      `INSERT INTO book_rating (user_id, book_id, rating, weight)
       VALUES (?, ?, ?, 1)
       ON DUPLICATE KEY UPDATE 
          rating = VALUES(rating), 
          weight = VALUES(weight)`,
      [mockReview.user_id, bookId, mockReview.rating]
    ); // Verify the rating insert/update query
  });

  it("should throw an error if the user does not exist", async () => {
    // Mock db query to return an empty result (user does not exist)
    db.query.mockResolvedValueOnce([[]]);

    // Call the addBookRatingService and expect it to throw
    await expect(addBookRatingService(mockReview, bookId)).rejects.toThrow(
      "User does not exist"
    );

    // Expectations
    expect(db.query).toHaveBeenCalledTimes(1); // Only the user check query should be called
    expect(db.query).toHaveBeenCalledWith(
      "SELECT user_id FROM user WHERE user_id = ?",
      [mockReview.user_id]
    );
  });

  it("should throw a custom error if the insert/update operation fails", async () => {
    // Mock db query to return a valid user
    db.query.mockResolvedValueOnce([[{ user_id: mockReview.user_id }]]);
    // Mock db query to simulate a database error during insert/update
    db.query.mockRejectedValueOnce(new Error("Insert/Update failed"));

    // Call the addBookRatingService and expect it to throw
    await expect(addBookRatingService(mockReview, bookId)).rejects.toThrow(
      "Failed to add or update book rating. Please try again later."
    );

    // Expectations
    expect(db.query).toHaveBeenCalledTimes(2); // Both user check and rating insert/update should be called
    expect(db.query).toHaveBeenCalledWith(
      `INSERT INTO book_rating (user_id, book_id, rating, weight)
       VALUES (?, ?, ?, 1)
       ON DUPLICATE KEY UPDATE 
          rating = VALUES(rating), 
          weight = VALUES(weight)`,
      [mockReview.user_id, bookId, mockReview.rating]
    );
  });

  it("should log an error and rethrow it if a database error occurs", async () => {
    // Mock db query to throw an error during user check
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    db.query.mockRejectedValueOnce(new Error("Database connection failed"));

    // Call the addBookRatingService and expect it to throw
    await expect(addBookRatingService(mockReview, bookId)).rejects.toThrow(
      "Failed to add or update book rating. Please try again later."
    );

    // Expectations
    expect(consoleSpy).toHaveBeenCalledWith("Database Error: ", "Database connection failed"); // Error should be logged
    expect(db.query).toHaveBeenCalledTimes(1); // Only the user check query should be called
    consoleSpy.mockRestore(); // Restore the console error
  });
});
