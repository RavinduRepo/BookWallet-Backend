const reviewService = require('../services/reviewService');
const authService = require('../services/authService');

const getReviewWithId = async (req, res) => {
  try {
    const { reviewId } = req.params;

    if (!reviewId) {
      return res.status(400).json({ message: "Review ID is required" });
    }

    const reviewDetail = await reviewService.getReviewWithId(reviewId);

    if (!reviewDetail) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json(reviewDetail);
  } catch (error) {
    console.error("Error fetching review details:", error);
    res.status(500).json({ message: "Server error while fetching review details" });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviewDetails = await reviewService.getReviews();

    if (reviewDetails.length === 0) {
      return res.status(404).json({ message: "No reviews found" });
    }

    res.status(200).json(reviewDetails);
  } catch (error) {
    console.error("Error fetching review details:", error);
    res.status(500).json({ message: "Server error while fetching review details" });
  }
};

const getReviewWithBookId = async (req, res) => {
  try {
    const { bookId } = req.params;

    if (!bookId) {
      return res.status(400).json({ message: "Book ID is required" });
    }

    const posts = await reviewService.getReviewWithBookId(bookId);

    if (posts.length === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching review details:", error);
    res.status(500).json({ message: "Server error while fetching review details" });
  }
};

const getReviewWithUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const posts = await reviewService.getReviewWithUserId(userId);

    if (posts.length === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching review details:", error);
    res.status(500).json({ message: "Server error while fetching review details" });
  }
};

const deleteReview = async (req, res) => {
  const { reviewId, userId } = req.params;
  const { token } = req.body;

  try {
    const decoded = await authService.verifyToken(token);
    const userIdToken = decoded.id.toString();
    if (userIdToken !== userId) {
        return res.status(403).json({ error: 'Unauthorized action' });
    }
    await reviewService.deleteReview(reviewId, userId);
    return res.status(200).json({ message: 'Review deleted successfully.' });
  } catch (error) {
    console.error('Error deleting review:', error);
    return res.status(500).json({ message: 'Failed to delete review.' });
  }
};

const updateReview = async (req, res) => {
    const { reviewId, userId } = req.params;
    const { content, rating, token } = req.body;

    try {
        const decoded = await authService.verifyToken(token);
        const userIdToken = decoded.id.toString();
        if (userIdToken !== userId) {
            return res.status(403).json({ error: 'Unauthorized action' });
        }
        await reviewService.updateReview(reviewId, userId, content, rating);
        return res.status(200).json({error: 'Review updated successfully'});
    } catch (error) {
        console.error('Error updating review:', error);
        return res.status(500).json({message: 'Failed to update review'});
    }
}

module.exports = {getReviewWithId, getReviews, getReviewWithBookId, getReviewWithUserId, deleteReview, updateReview};
