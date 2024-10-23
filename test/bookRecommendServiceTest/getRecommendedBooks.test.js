const { getRecommendedBooks } = require("../../services/bookRecommendService");
const db = require("../../config/dbConfig");

jest.mock("../../config/dbConfig.js");

describe("getRecommendedBooks Service", () => {
    it("should return recommended books mapped to the Book model when data exists", async () => {
        const mockRecommendedBooksData = [
            {
                bookId: 1,
                title: "test-title",
                ISBN10: "test-ISBN10",
                ISBN13: "test-ISBN13",
                publication_date: "test-date",
                description: "test-description",
                author: "test-author",
                rating: 2.5,
                pages: 100,
                genre: "test-genre",
                imageUrl: "imageUrl",
                resource: "test-resource",
            },
        ];

        db.execute.mockResolvedValue([mockRecommendedBooksData]);

        const result = await getRecommendedBooks(1);

        expect(result).toHaveLength(1);
        expect(result[0]).toMatchObject({
            bookId: 1,
            title: "test-title",
            ISBN10: "test-ISBN10",
            ISBN13: "test-ISBN13",
            publishedDate: "test-date",
            description: "test-description",
            author: "test-author",
            totalRating: 2.5,
            pages: 100,
            genre: "test-genre",
            imageUrl: "imageUrl",
            resource: "test-resource",
        });
    });

    it("should return an empty array when no recommended books are found", async () => {
        db.execute.mockResolvedValue([[]]);

        const result = await getRecommendedBooks(999);

        expect(result).toEqual([]);
    });

    it("should handle database errors gracefully", async () => {
        db.execute.mockRejectedValue(new Error("Database error"));

        await expect(getRecommendedBooks(1)).rejects.toThrow("Database");
    });
});
