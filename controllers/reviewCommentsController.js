const reviewCommentsService = require("../services/reviewCommentsService");
const authService = require("../services/authService");

const addCommentController = async (req, res) => {
  console.log("Received request at addCommentController");

  const { comment, reviewId, token } = req.body;

  // Check if the comment and reviewId are provided
  if (!comment || !reviewId) {
    return res
      .status(400)
      .json({ message: "Comment and review ID are required" });
  }

  try {
    // Verify the token to get the user ID
    const decoded = await authService.verifyToken(token);
    const userIdToken = decoded.id.toString();

    // Check if the user ID from the token matches the comment's user ID
    const userId = comment.user_id.toString();

    // //For Deubbugging
    // console.log("User ID from token: ", userIdToken);
    // console.log("User ID from comment: ", userId);

    if (userIdToken !== userId) {
      //Checking the userids are same
      return res.status(403).json({ error: "Unauthorized action" });
    }

    // Add the comment to the database
    const result = await reviewCommentsService.addCommentService(
      comment,
      reviewId
    );

    // Check if the comment was added successfully
    if (result) {
      res.status(201).json({ message: "Comment added successfully" });
    } else {
      res.status(500).json({ message: "Failed to add comment" });
    }
  } catch (error) {
    console.error("Error adding comment: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//fot get comment for relevant review
const getCommentsByReviewIdController = async (req, res) => {
  try {
    const { reviewId } = req.params;

    if (!reviewId) {
      return res.status(400).json({ message: "Review ID is required" });
    }

    const commentsDetails =
      await reviewCommentsService.getCommentsByReviewIdService(reviewId);

    if (commentsDetails.length === 0) {
      return res
        .status(404)
        .json({ message: "No comments found for this review" });
    }

    res.status(200).json(commentsDetails);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Server error while fetching comments" });
  }
};

//For delete the comments by only user who have sent
const deleteCommentController = async (req, res) => {
  const { commentId, userId } = req.params;
  const { token } = req.body;

  try {
    const decoded = await authService.verifyToken(token);
    const userIdToken = decoded.id.toString();
    if (userIdToken !== userId) {
      return res.status(403).json({ error: "Unauthorized action" });
    }
    await reviewCommentsService.deleteCommentService(commentId, userId);
    return res.status(200).json({ message: "Comment deleted successfully." });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return res.status(500).json({ message: "Failed to delete comment." });
  }
};

//for edit the comment by only user who have sent
const updateCommentController = async (req, res) => {
  const { commentId, userId } = req.params;
  const { context, token } = req.body;
  console.log("try to edit comment");
  try {
    const decoded = await authService.verifyToken(token);
    const userIdToken = decoded.id.toString();
    if (userIdToken !== userId) {
      return res.status(403).json({ error: "Unauthorized action" });
    }
    await reviewCommentsService.updateCommentService(
      commentId,
      userId,
      context
    );
    return res.status(200).json({ message: "Comment updated successfully." });
  } catch (error) {
    console.error("Error updating comment:", error);
    return res.status(500).json({ message: "Failed to update comment." });
  }
};

module.exports = {
  addCommentController,
  getCommentsByReviewIdController,
  deleteCommentController,
  updateCommentController,
};
