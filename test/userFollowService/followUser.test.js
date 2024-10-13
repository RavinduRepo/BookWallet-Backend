const db = require("../../config/dbConfig");
const { followUser } = require("../../services/userfollowService");

jest.mock("../../config/dbConfig");

describe("followUser Service", () => {
    it("should return affectedRows when a follow is successful", async () => {
        // Mock the DB response to simulate successful follow
        db.execute.mockResolvedValue([{ affectedRows: 1 }]);

        // Call the service
        const result = await followUser(1, 123);

        // Expect the service to return success with affectedRows
        expect(result).toEqual({ status: 201, affectedRows: 1 });
    });

    it("should throw an error when a database error occurs", async () => {
        // Mock DB error
        db.execute.mockRejectedValue(new Error("Database error"));

        // Expect the service to throw the error
        await expect(followUser(1, 123)).rejects.toThrow("Database error: Database error");
    });
});
