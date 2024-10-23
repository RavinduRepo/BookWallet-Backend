const db = require("../../config/dbConfig");
const authService = require("../../services/authService");
const trendingpointsService = require("../../services/trendingpointsService");
const { recommendBook } = require("../../services/bookRecommendService");

jest.mock("../../config/dbConfig");
jest.mock("../../services/authService");
jest.mock("../../services/trendingpointsService");

describe("recommendBook Service", () => {
    it("should return 403 if the token user ID does not match the recommenderId", async () => {
        // Mock token verification with a different user ID
        authService.verifyToken.mockResolvedValue({ id: 999 });  // Using an integer here for ID

        // Call the service
        const result = await recommendBook(1, 123, "valid-token");

        // Expect a 403 Unauthorized error since the IDs don't match
        expect(result).toEqual({ status: 403, error: "Unauthorized action" });
    });

    it("should return 404 if no followers are found for the recommender", async () => {
        // Mock token verification with the correct user ID
        authService.verifyToken.mockResolvedValue({ id: 123 });

        // Mock the DB response to return no followers
        db.execute.mockResolvedValue([[]]);

        // Call the service
        const result = await recommendBook(1, 123, "valid-token");

        // Expect a 404 error for no followers found
        expect(result).toEqual({ status: 404, error: "No followers found for the given recommender ID" });
    });

    it("should recommend the book to all followers and return 201 on success", async () => {
        // Mock token verification with the correct user ID
        authService.verifyToken.mockResolvedValue({ id: 123 });

        // Mock the DB response to return a list of followers
        const mockFollowers = [{ follower_id: 10 }, { follower_id: 20 }];
        db.execute
            .mockResolvedValueOnce([mockFollowers])  // First call returns followers
            .mockResolvedValueOnce([])  // Mock the insertions into the book_recommended table
            .mockResolvedValueOnce([]);  // For each follower

        // Mock the trending points service
        trendingpointsService.addTrendingPoint.mockResolvedValue();

        // Call the service
        const result = await recommendBook(1, 123, "valid-token");

        // Expect a 201 success status
        expect(result).toEqual({ status: 201 });

        // Check that trending points were added
        expect(trendingpointsService.addTrendingPoint).toHaveBeenCalledWith(1, 40);

        // Check that recommendations were inserted for each follower
        expect(db.execute).toHaveBeenCalledWith(
            "INSERT INTO book_recommended (book_id, user_id) VALUES (?, ?)", [1, 10]
        );
        expect(db.execute).toHaveBeenCalledWith(
            "INSERT INTO book_recommended (book_id, user_id) VALUES (?, ?)", [1, 20]
        );
    });

    it("should handle errors and throw an error message", async () => {
        // Mock token verification
        authService.verifyToken.mockResolvedValue({ id: 123 });

        // Mock DB error
        db.execute.mockRejectedValue(new Error("Database error"));

        // Expect the service to throw an error
        await expect(recommendBook(1, 123, "valid-token")).rejects.toThrow("Error recommending book: Database error");
    });
});
