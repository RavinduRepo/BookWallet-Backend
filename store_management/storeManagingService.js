const Shop = require("./shopModel");

// Example shop data
const shops = [
  new Shop(
    1,
    "Sarasavi Bookshop",
    "Books",
    "Piliyandala",
    "0785104489",
    "https://maps.app.goo.gl/FZE8VLtjnmunijKH7"
  ),
  new Shop(
    2,
    "Windsor Book Shop",
    "Books",
    "Maharagama",
    "0760899524",
    "https://maps.app.goo.gl/uyUsgYpSiWHeMH8GA"
  ),
];

// Example available books data
const availableBooks = [
  { bookId: 91, storeId: 1 },
  { bookId: 117, storeId: 2 },
  { bookId: 91, storeId: 2 },
  { bookId: 33, storeId: 2 },
  { bookId: 117, storeId: 1 },
];

// Service function to get shops by bookId
exports.getShopsByBookId = (bookId) => {
  try {
    // Find store IDs where the book is available
    const storeIds = availableBooks
      .filter((book) => book.bookId === bookId)
      .map((book) => book.storeId);

    // Find shops with matching store IDs
    const matchingShops = shops.filter((shop) =>
      storeIds.includes(shop.shopId)
    );
    return matchingShops;
  } catch (error) {
    console.error("Error fetching shops by bookId:", error);
    throw new Error("Server error while fetching shops");
  }
};
