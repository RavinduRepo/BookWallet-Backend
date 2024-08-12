const validateBookReview = (req, res, next) => {
  const { book, review, token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  if (!book || typeof book !== "object") {
    return res.status(400).json({ message: "Invalid book data" });
  }

  if (!review || typeof review !== "object") {
    return res.status(400).json({ message: "Invalid review data" });
  }

  const requiredBookFields = [
    "title",
    "ISBN10",
    "ISBN13",
    "publication_date",
    "description",
    "author",
    "rating",
    "genre",
  ];

  const requiredReviewFields = ["user_id", "context", "rating"];

  for (const field of requiredBookFields) {
    if (book[field] === undefined || book[field] === null) {
      return res.status(400).json({ message: `Missing book field: ${field}` });
    }
  }

  for (const field of requiredReviewFields) {
    if (review[field] === undefined || review[field] === null) {
      return res
        .status(400)
        .json({ message: `Missing review field: ${field}` });
    }
  }

  next();
};

module.exports = validateBookReview;
