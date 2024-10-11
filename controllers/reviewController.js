const reviewService = require("../services/reviewService");
const authService = require("../services/authService");

// Fetch a specific review by its ID
const getReviewWithId = async (req, res) => {
  try {
    const { reviewId } = req.params; // Extract review ID from the request URL

    // Check if the review ID is provided
    if (!reviewId) {
      return res.status(400).json({ message: "Review ID is required" });
    }

    // Fetch the review details from the review service
    const reviewDetail = await reviewService.getReviewWithId(reviewId);

    // If no review is found, return a 404 error
    if (!reviewDetail) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Send the review details in the response
    res.status(200).json(reviewDetail);
  } catch (error) {
    console.error("Error fetching review details:", error);
    // Handle server error during review retrieval
    res
      .status(500)
      .json({ message: "Server error while fetching review details" });
  }
};

// Fetch all reviews
const getReviews = async (req, res) => {
  try {
    // Fetch all reviews from the review service
    const reviewDetails = await reviewService.getReviews();

    // If no reviews are found, return a 404 error
    if (reviewDetails.length === 0) {
      return res.status(404).json({ message: "No reviews found" });
    }

    // Send the list of reviews in the response
    res.status(200).json(reviewDetails);
  } catch (error) {
    console.error("Error fetching review details:", error);
    // Handle server error during reviews retrieval
    res
      .status(500)
      .json({ message: "Server error while fetching review details" });
  }
};

// Fetch all reviews associated with a specific book
const getReviewWithBookId = async (req, res) => {
  try {
    const { bookId } = req.params; // Extract book ID from the request URL

    // Check if the book ID is provided
    if (!bookId) {
      return res.status(400).json({ message: "Book ID is required" });
    }

    // Fetch reviews related to the specified book from the review service
    const posts = await reviewService.getReviewWithBookId(bookId);

    // If no reviews are found, return a 404 error
    if (posts.length === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Send the reviews in the response
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching review details:", error);
    // Handle server error during review retrieval
    res
      .status(500)
      .json({ message: "Server error while fetching review details" });
  }
};

// Fetch all reviews posted by a specific user
const getReviewWithUserId = async (req, res) => {
  try {
    const { userId } = req.params; // Extract user ID from the request URL

    // Check if the user ID is provided
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch reviews posted by the user from the review service
    const posts = await reviewService.getReviewWithUserId(userId);

    // If no reviews are found, return a 404 error
    if (posts.length === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Send the reviews in the response
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching review details:", error);
    // Handle server error during review retrieval
    res
      .status(500)
      .json({ message: "Server error while fetching review details" });
  }
};

// Delete a specific review
const deleteReview = async (req, res) => {
  const { reviewId, userId } = req.params; // Extract review and user ID from the request URL
  const { token } = req.body; // Extract token from the request body

  try {
    // Verify the token and retrieve the user ID from the token
    const decoded = await authService.verifyToken(token);
    const userIdToken = decoded.id.toString();

    // Check if the user from the token matches the user attempting to delete the review
    if (userIdToken !== userId) {
      return res.status(403).json({ error: "Unauthorized action" });
    }

    // Call review service to delete the review
    await reviewService.deleteReview(reviewId, userId);

    // Send success response if the review is deleted successfully
    return res.status(200).json({ message: "Review deleted successfully." });
  } catch (error) {
    console.error("Error deleting review:", error);
    // Handle server error during review deletion
    return res.status(500).json({ message: "Failed to delete review." });
  }
};

// Update a specific review
const updateReview = async (req, res) => {
  const { reviewId, userId } = req.params; // Extract review and user ID from the request URL
  const { content, rating, token } = req.body; // Extract review content, rating, and token from the request body

  try {
    // Verify the token and retrieve the user ID from the token
    const decoded = await authService.verifyToken(token);
    const userIdToken = decoded.id.toString();

    // Check if the user from the token matches the user attempting to update the review
    if (userIdToken !== userId) {
      return res.status(403).json({ error: "Unauthorized action" });
    }

    // Call review service to update the review with the new content and rating
    await reviewService.updateReview(reviewId, userId, content, rating);

    // Send success response if the review is updated successfully
    return res.status(200).json({ error: "Review updated successfully" });
  } catch (error) {
    console.error("Error updating review:", error);
    // Handle server error during review update
    return res.status(500).json({ message: "Failed to update review" });
  }
};

module.exports = {
  getReviewWithId,
  getReviews,
  getReviewWithBookId,
  getReviewWithUserId,
  deleteReview,
  updateReview,
};
