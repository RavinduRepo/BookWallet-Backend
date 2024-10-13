const db = require("../../config/dbConfig");
const { checkIfFollowing } = require("../../services/userfollowService");

jest.mock("../../config/dbConfig");

describe("checkIfFollowing Service", () => {
    it("should return true if the user is following", async () => {
        // Mock the DB response to simulate a follower
        db.query.mockResolvedValue([[{ count: 1 }]]);

        // Call the service
        const result = await checkIfFollowing(1, 123);

        // Expect the service to return true (indicating the user is following)
        expect(result).toBe(true);
    });

    it("should return false if the user is not following", async () => {
        // Mock the DB response to simulate no follower
        db.query.mockResolvedValue([[{ count: 0 }]]);

        // Call the service
        const result = await checkIfFollowing(1, 123);

        // Expect the service to return false (indicating the user is not following)
        expect(result).toBe(false);
    });

    it("should handle errors and throw an error message", async () => {
        // Mock DB error
        db.query.mockRejectedValue(new Error("Database error"));

        // Expect the service to throw the error
        await expect(checkIfFollowing(1, 123)).rejects.toThrow("Database error: Database error");
    });
});
