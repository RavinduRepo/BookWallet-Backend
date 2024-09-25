const wishlistService = require("../services/wishlistService");
const authService = require("../services/authService");

exports.getWishlistByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const wishlistBooks = await wishlistService.getWishlistByUserId(userId);

    console.log("Wishlist Books:", wishlistBooks); // This should now log the correct data

    if (wishlistBooks.length > 0) {
      return res.status(200).json(wishlistBooks);
    } else {
      return res
        .status(200)
        .json({ message: "No wishlist found for this user." });
    }
  } catch (error) {
    console.error("Error retrieving wishlist:", error);
    res
      .status(500)
      .json({ message: "Error retrieving wishlist", error: error.message });
  }
};
exports.addToWishlist = async (req, res) => {
  try {
    console.log("hi");
    const { bookId } = req.params;
    const token = req.headers.authorization?.split(" ")[1]; // Extract the token from the Authorization header

    if (!bookId) {
      return res.status(400).json({ message: "Book ID is required" });
    }

    if (!token) {
      return res
        .status(401)
        .json({ message: "Authorization token is required" });
    }
    // Decode and verify the token
    const decoded = await authService.verifyToken(token);
    const userId = decoded.id.toString();
    // Add the book_id to the wishlist for the authenticated user
    await wishlistService.addToWishlist(userId, bookId);

    return res
      .status(200)
      .json({ message: "Book added to wishlist successfully" });
  } catch (error) {
    console.error("Error adding book to wishlist:", error);
    return res.status(500).json({
      message: "Server error while adding book to wishlist",
      error: error.message,
    });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    // Get the token from the Authorization header
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Authorization token is missing" });
    }
    // Verify token and get user ID
    const decoded = await authService.verifyToken(token);
    const user_id = decoded.id;

    const { bookId } = req.params;

    if (!bookId) {
      return res.status(400).json({ message: "Book ID is required" });
    }

    // Call the service to remove the book from the wishlist
    const result = await wishlistService.removeFromWishlist(user_id, bookId);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error removing book from wishlist:", error);
    return res.status(500).json({
      message: "Server error while removing book from wishlist",
      error: error.message,
    });
  }
};

exports.getBookIdforwishlist = async (req, res) => {
  const { book } = req.body;

  if (!book) {
    return res.status(400).json({ message: "Book details are required" });
  }

  try {
    const bookId = await wishlistService.getBookid(book);
    console.log(bookId);
    res.status(200).json({ bookId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
