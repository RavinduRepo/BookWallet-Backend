class Post {
  constructor(
    reviewId,
    bookId,
    userId,
    imagePath,
    bookName,
    authorName,
    context,
    rating,
    date,
    reviwerName,
    likesCount,
    commentsCount,
    sharesCount
  ) {
    this.reviewId = reviewId;
    this.bookId = bookId;
    this.userId = userId;
    this.imagePath = imagePath;
    this.bookName = bookName;
    this.authorName = authorName;
    this.context = context;
    this.rating = rating;
    this.date = date;
    this.reviwerName = reviwerName;
    this.likesCount = likesCount;
    this.commentsCount = commentsCount;
    this.sharesCount = sharesCount;
  }
}

module.exports = Post;
