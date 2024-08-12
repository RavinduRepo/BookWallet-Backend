const db = require("../config/dbConfig");
const Post = require("../models/postModel");

const getReviewWithId = async (req, res) => {
  try {
    const { reviewId } = req.params;

    if (!reviewId) {
      return res.status(400).json({ message: "Review ID is required" });
    }

    const query = `
            SELECT reviewed.*, user.username, book.title, book.author
            FROM reviewed
            INNER JOIN user ON reviewed.user_id = user.user_id
            INNER JOIN book ON reviewed.book_id = book.book_id
            WHERE reviewed.review_id = ?
        `;

    const [reviewDetails] = await db.execute(query, [reviewId]);

    if (reviewDetails.length === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ reviewDetails });
  } catch (error) {
    console.error("Error fetching review details:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching review details" });
  }
};

const getReviews = async (req, res) => {
  try {
    const query = `
            SELECT reviewed.*, user.username, book.title, book.author, book.imageUrl
            FROM reviewed
            INNER JOIN user ON reviewed.user_id = user.user_id
            INNER JOIN book ON reviewed.book_id = book.book_id
        `;
    const [reviewDetails] = await db.execute(query);
    console.log(reviewDetails);
    if (reviewDetails.length === 0) {
      return res.status(404).json({ message: "No reviews found" });
    }

    res.status(200).json({ reviewDetails });
  } catch (error) {
    console.error("Error fetching review details:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching review details" });
  }
};

const getReviewWithBookId = async (req, res) => {
  try {
    const { bookId } = req.params;

    if (!bookId) {
      return res.status(400).json({ message: "Book ID is required" });
    }
    //     const query = `
    //     SELECT reviewed.*,
    //            user.username,
    //            book.title,
    //            book.author,
    //            (SELECT COUNT(*) FROM likes WHERE review_id = reviewed.review_id) AS likesCount,
    //            (SELECT COUNT(*) FROM comments WHERE review_id = reviewed.review_id) AS commentsCount,
    //            (SELECT COUNT(*) FROM shares WHERE review_id = reviewed.review_id) AS sharesCount
    //     FROM reviewed
    //     INNER JOIN user ON reviewed.user_id = user.user_id
    //     INNER JOIN book ON reviewed.book_id = book.book_id
    //     WHERE reviewed.review_id = ?;
    //   `;

    //       const [reviewDetails] = await db.execute(query, [reviewId]);

    const query = `
    SELECT reviewed.review_id, 
       reviewed.book_id, 
       reviewed.user_id, 
       reviewed.context, 
       reviewed.rating, 
       reviewed.date,
       book.title, 
       book.author, 
       book.imageUrl, 
       user.username,
       COUNT(DISTINCT likes.user_id) AS likesCount,
       COUNT(DISTINCT comments.comment_id) AS commentsCount,
       COUNT(DISTINCT shares.share_id) AS sharesCount
FROM reviewed
INNER JOIN user ON reviewed.user_id = user.user_id
INNER JOIN book ON reviewed.book_id = book.book_id
LEFT JOIN likes ON likes.review_id = reviewed.review_id
LEFT JOIN comments ON comments.review_id = reviewed.review_id
LEFT JOIN shares ON shares.review_id = reviewed.review_id
WHERE book.book_id = ?
GROUP BY reviewed.review_id, 
         reviewed.book_id, 
         reviewed.user_id, 
         reviewed.context, 
         reviewed.rating, 
         reviewed.date,
         book.title, 
         book.author, 
         book.imageUrl, 
         user.username;


`;

    const [reviewDetails] = await db.execute(query, [bookId]);

    if (reviewDetails.length === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    const posts = reviewDetails.map(
      (reviewDetail) =>
        new Post(
          reviewDetail.review_id,
          reviewDetail.book_id,
          reviewDetail.user_id,
          reviewDetail.imageUrl,
          reviewDetail.title,
          reviewDetail.author,
          reviewDetail.context,
          reviewDetail.rating,
          reviewDetail.date,
          reviewDetail.username,
          reviewDetail.likesCount,
          reviewDetail.commentsCount,
          reviewDetail.sharesCount
        )
    );

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching review details:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching review details" });
  }
};

const getReviewWithUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const query = `
    SELECT reviewed.review_id, 
           reviewed.book_id, 
           reviewed.user_id, 
           reviewed.context, 
           reviewed.rating, 
           reviewed.date,
           book.title, 
           book.author, 
           book.imageUrl, 
           user.username,
           COUNT(DISTINCT likes.user_id) AS likesCount,
           COUNT(DISTINCT comments.comment_id) AS commentsCount,
           COUNT(DISTINCT shares.share_id) AS sharesCount
           
    FROM reviewed
    INNER JOIN user ON reviewed.user_id = user.user_id
    INNER JOIN book ON reviewed.book_id = book.book_id
    LEFT JOIN likes ON likes.review_id = reviewed.review_id
    LEFT JOIN comments ON comments.review_id = reviewed.review_id
    LEFT JOIN shares ON shares.review_id = reviewed.review_id
    WHERE user.user_id = ?
    GROUP BY reviewed.review_id, 
             reviewed.book_id, 
             reviewed.user_id, 
             reviewed.context, 
             reviewed.rating, 
             reviewed.date,
             book.title, 
             book.author, 
             book.imageUrl, 
             user.username;
             
`;

    const [reviewDetails] = await db.execute(query, [userId]);

    if (reviewDetails.length === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    const posts = reviewDetails.map(
      (reviewDetail) =>
        new Post(
          reviewDetail.review_id,
          reviewDetail.book_id,
          reviewDetail.user_id,
          reviewDetail.imageUrl,
          reviewDetail.title,
          reviewDetail.author,
          reviewDetail.context,
          reviewDetail.rating,
          reviewDetail.date,
          reviewDetail.username,
          reviewDetail.likesCount,
          reviewDetail.commentsCount,
          reviewDetail.sharesCount
        )
    );

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching review details:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching review details" });
  }
};

module.exports = {
  getReviewWithId,
  getReviews,
  getReviewWithBookId,
  getReviewWithUserId,
};
