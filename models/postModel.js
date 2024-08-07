class Post {
    constructor(reviewId, bookId, userId, imagePath, bookName, authorName, context, rating, reviwerName) {
      this.reviewId = reviewId;
      this.bookId = bookId;
      this.userId = userId;
      this.imagePath = imagePath;
      this.bookName = bookName;
      this.authorName = authorName;
      this.context = context;
      this.rating = rating;
      this.reviwerName = reviwerName;
    }
  }
  
  module.exports = Post;
  