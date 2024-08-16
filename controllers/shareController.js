const shareService = require('../services/shareService');

exports.shareReview = async (req, res) => {
  const { review_id, user_id } = req.body;

  try {
    // Check if the review has already been shared by the user
    const existingShare = await shareService.findShare(review_id, user_id);
    if (existingShare) {
      // If the review was already shared, just increment the share count
      await shareService.incrementShareCount(review_id, user_id);
    } else {
      // If the review was not shared before, create a new share record
      await shareService.createShare(review_id, user_id);
    }

    res.status(200).json({ message: 'Review shared successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to share review' });
  }
};
exports.getSharedReviewsByUser = async (req, res) => {
  const { user_id } = req.params;

  try {
    const sharedReviews = await shareService.getSharedReviewsByUser(user_id);
    res.status(200).json(sharedReviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch shared reviews' });
  }
};
