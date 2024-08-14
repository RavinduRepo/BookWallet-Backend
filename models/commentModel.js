class Comment {
  constructor(commentId, userId, reviewId, context, date, time, username) {
    this.commentId = commentId;
    this.userId = userId;
    this.reviewId = reviewId;
    this.context = context;
    this.date = date;
    this.time = time;
    this.username = username;
  }
}

module.exports = Comment;
