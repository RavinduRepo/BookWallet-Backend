const {getUserProfile} = require("../../services/userServices");
const db = require("../../config/dbConfig");

jest.mock("../../config/dbConfig.js");

describe("getUserProfile Service", () => {
    it("should return user profile details mapped to the UserProfile model when data exists", async () => {
        const mockUserProfileData = [
            {
                user_id: 1,
                username: "test-user",
                email: "test@gmail.com",
                description: "test-description",
            },
        ];

        db.execute.mockResolvedValue([mockUserProfileData]);

        const result = await getUserProfile(1);

        expect(result).toHaveLength(1);
        expect(result[0]).toMatchObject({
            userId: 1,
            username: "test-user",
            email: "test@gmail.com",
            description: "test-description",
            imageUrl: "imageUrl",
        });
    });

    it("should return an empty array when no userProfile is found", async () => {
        db.execute.mockResolvedValue([[]]);

        const result = await getUserProfile(999);

        expect(result).toEqual([]);  // Test expects an empty array
    });

    it("should handle database errors gracefully", async () => {
        db.execute.mockRejectedValue(new Error("Database error"));

        await expect(getUserProfile(1)).rejects.toThrow("Database");
    });
});
