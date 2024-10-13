const db = require("../../config/dbConfig");
const { unfollowUser } = require("../../services/userfollowService");

jest.mock("../../config/dbConfig");

describe("unfollowUser Service", () => {
    it("should return affectedRows when unfollow is successful", async () => {
        // Mock the DB response to simulate a successful unfollow operation
        db.query.mockResolvedValue([[{ affectedRows: 1 }]]);

        // Call the service
        const result = await unfollowUser(1, 123);

        // Expect a success with affectedRows
        expect(result).toEqual({ status: 200, affectedRows: 1 });
    });

    it("should return a 404 error if no followers were found", async () => {
        // Mock the DB response to return no affected rows
        db.query.mockResolvedValue([[{ affectedRows: 0 }]]);

        // Call the service
        const result = await unfollowUser(1, 123);

        // Expect a 404 error
        expect(result).toEqual({ status: 404, error: "No followers found for the given recommender ID" });
    });

    it("should handle errors and throw an error message", async () => {
        // Mock DB error
        db.query.mockRejectedValue(new Error("Database error"));

        // Expect the service to throw the error
        await expect(unfollowUser(1, 123)).rejects.toThrow("Database error: Database error");
    });
});
