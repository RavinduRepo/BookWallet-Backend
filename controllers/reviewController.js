const reviewService = require('../services/reviewService');
const authService = require('../services/authService');

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

module.exports = {deleteReview, updateReview};
