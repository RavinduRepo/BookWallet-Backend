const db = require("../../config/dbConfig");
const trendingpointsService = require("../../services/trendingpointsService");
const { addToWishlist, removeFromWishlist } = require("../../services/wishlistService"); // Adjust path if necessary

jest.mock("../../config/dbConfig"); // Mock db module
jest.mock("../../services/trendingpointsService"); // Mock trendingpoints service

describe("Wishlist Service", () => {
  describe("addToWishlist", () => {
    it("should add a book to the wishlist and increase trending points", async () => {
      // Mock the db query and trendingpoints service
      db.query.mockResolvedValueOnce();
      trendingpointsService.addTrendingPoint.mockResolvedValueOnce();

      // Call the service function
      await addToWishlist(77, 35);

      // Verify that db.query and addTrendingPoint were called correctly
      expect(trendingpointsService.addTrendingPoint).toHaveBeenCalledWith(35, 8);
      expect(db.query).toHaveBeenCalledWith("INSERT INTO wishlist (user_id, book_id) VALUES (?, ?)", [77, 35]);
    });

    it("should handle errors when adding to wishlist", async () => {
      // Mock the db query to throw an error
      db.query.mockRejectedValueOnce(new Error("Database error"));

      // Call the service function and expect an error
      await expect(addToWishlist(77, 35)).rejects.toThrow("Error adding to wishlist: Database error");
    });
  });

  describe("removeFromWishlist", () => {
    it("should remove a book from the wishlist", async () => {
      // Mock the db query
      db.query.mockResolvedValueOnce();

      // Call the service function
      const result = await removeFromWishlist(77, 35);

      // Verify that db.query was called with the correct parameters
      expect(db.query).toHaveBeenCalledWith("DELETE FROM wishlist WHERE user_id = ? AND book_id = ?", [77, 35]);

      // Verify the success message
      expect(result).toEqual({ message: "Book removed from wishlist successfully" });
    });

    it("should handle errors when removing from wishlist", async () => {
      // Mock the db query to throw an error
      db.query.mockRejectedValueOnce(new Error("Database error"));

      // Call the service function and expect an error
      await expect(removeFromWishlist(77, 35)).rejects.toThrow("Error removing from wishlist: Database error");
    });
  });
});
