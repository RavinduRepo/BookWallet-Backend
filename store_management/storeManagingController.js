const shopService = require("../store_management/storeManagingService");

// Controller method to handle the request for fetching shops by book ID
exports.getShopsByBookId = (req, res) => {
  const { bookId } = req.params;  // Extract bookId from request parameters

  // Validate that the bookId is provided
  if (!bookId) {
    return res.status(400).json({ error: "bookId is required" });  // Return 400 Bad Request if missing
  }

  try {
    // Call the shop service to fetch shops associated with the given bookId
    const shops = shopService.getShopsByBookId(parseInt(bookId));  // Convert bookId to an integer

    // Check if any shops were found
    if (shops.length > 0) {
      return res.status(200).json(shops);  // Return shops with 200 OK status if found
    } else {
      return res.status(404).json({ message: "No shops found for the given bookId" });  // Return 404 Not Found if no shops are found
    }
  } catch (error) {
    // Return 500 Internal Server Error in case of any exception
    return res.status(500).json({ error: error.message });
  }
};
