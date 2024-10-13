const shareService = require('../services/shareService');
const authService = require('../services/authService'); 
const trendingpointsService = require("../services/trendingpointsService");


exports.shareReview = async (req, res) => {
  const { review_id, user_id } = req.body;
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    console.log('Authorization token missing');
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  try {
    console.log(`Token retrieved: ${token}`);
    const decoded = await authService.verifyToken(token);
    const tokenUserId = decoded.id.toString();
    
    if (tokenUserId !== user_id.toString()) {
      console.log('Unauthorized action: token user ID does not match request user ID');
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    const existingShare = await shareService.findShare(review_id, user_id);
    if (existingShare) {
      await shareService.removeShare(review_id, user_id);
      return res.status(200).json({ message: 'Review share removed successfully' });
    } else {
      await trendingpointsService.addTrendingPointFromReview(review_id, 5);
      await shareService.createShare(review_id, user_id);
      return res.status(200).json({ message: 'Review shared successfully' });
    }
  } catch (error) {
    console.error('Error in shareReview:', error.message);
    return res.status(500).json({ error: 'Failed to share or remove review', details: error.message });
  }
};

exports.checkIfShared = async (req, res) => {
  const { review_id, user_id } = req.body;

  try {
    const isShared = await shareService.isReviewShared(review_id, user_id);
    res.status(200).json({ shared: isShared });
  } catch (error) {
    res.status(500).json({ error: 'Failed to check if review is shared', details: error.message });
  }
};
exports.getSharedReviewsByUser = async (req, res) => {
  const { user_id } = req.params;
  const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  try {
    // Decode and verify the token
    const decoded = await authService.verifyToken(token);
    const tokenUserId = decoded.id.toString();

    // Check if the token user ID matches the user ID from the request
    if (tokenUserId !== user_id) {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    const sharedReviews = await shareService.getSharedReviewsByUser(user_id);
    res.status(200).json(sharedReviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch shared reviews', details: error.message });
  }
};

exports.getUsersWhoSharedReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const users = await shareService.getUsersWhoSharedReview(reviewId);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getReviewsSharedByUserOrderofTime = async (req, res) => {
  const userId = req.params.userId;

  try {
    const sharedReviews = await shareService.getReviewsSharedByUserOrderofTime(userId);
    res.status(200).json(sharedReviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserActivitiesByTimeOrder = async (req, res) => {
  try {
    const { userId } = req.params;
    const activities = await shareService.getAllUserActivitiesByTimeOrder(userId);
    res.status(200).json(
      //success: true,
      //message: `Activities for user ${userId} retrieved successfully`,
       activities,
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};