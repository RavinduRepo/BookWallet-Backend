const shopService = require("../store_management/storeManagingService");

// Controller method to handle the request
exports.getShopsByBookId = (req, res) => {
  const { bookId } = req.params;

  if (!bookId) {
    return res.status(400).json({ error: "bookId is required" });
  }

  try {
    const shops = shopService.getShopsByBookId(parseInt(bookId));

    if (shops.length > 0) {
      return res.status(200).json(shops);
    } else {
      return res.status(404).json({ message: "No shops found for the given bookId" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
