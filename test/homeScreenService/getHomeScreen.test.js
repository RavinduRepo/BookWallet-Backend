const { getHomeScreen } = require("../../services/homeScreenService");
const db = require("../../config/dbConfig");
const Post = require("../../models/postModel");
const Book = require("../../models/bookModel");

jest.mock("../../config/dbConfig.js");

describe("getHomeScreen Service", () => {
  const mockReviewData = [
    {
      review_id: 1,
      book_id: 1,
      user_id: 1,
      imageUrl: "http://example.com/book.jpg",
      title: "Sample Book",
      author: "Author Name",
      context: "Great review content",
      rating: 4.5,
      date: "2024-10-10",
      username: "user123",
      likesCount: 10,
      commentsCount: 5,
      sharesCount: 3,
    },
  ];

  const mockBookData = [
    {
      bookId: 1,
      title: "Sample Book",
      ISBN10: "1234567890",
      ISBN13: "1234567890123",
      publication_date: "2024-01-01",
      description: "This is a sample book.",
      author: "Author Name",
      rating: 4.5,
      pages: 300,
      genre: "Fiction",
      imageUrl: "http://example.com/book.jpg",
      resource: "Library",
    },
  ];

  it("should return review details mapped to the Post model when data exists", async () => {
    db.execute.mockResolvedValueOnce([mockReviewData, undefined]);

    const result = await getHomeScreen(1, 1);

    expect(result.reviews).toHaveLength(1);
    expect(result.reviews[0]).toMatchObject({
      reviewId: 1,
      bookId: 1,
      userId: 1,
      imagePath: "http://example.com/book.jpg",
      bookName: "Sample Book",
      authorName: "Author Name",
      context: "Great review content",
      rating: 4.5,
      date: "2024-10-10",
      reviewerName: "user123",
      likesCount: 10,
      commentsCount: 5,
      sharesCount: 3,
    });
  });

  it("should return book details mapped to the Book model when data exists", async () => {
    db.execute.mockResolvedValueOnce([mockBookData, undefined]);

    const result = await getHomeScreen(1, 1); // Assume userId = 1, page = 1

    expect(result.books).toHaveLength(1);
    expect(result.books[0]).toMatchObject({
      bookId: 1,
      title: "Sample Book",
      ISBN10: "1234567890",
      ISBN13: "1234567890123",
      publicationDate: "2024-01-01",
      description: "This is a sample book.",
      author: "Author Name",
      totalRating: 4.5,
      pages: 300,
      genre: "Fiction",
      imageUrl: "http://example.com/book.jpg",
      resource: "Library",
    });
  });

  it("should return empty reviews and books when no data exists", async () => {
    db.execute.mockResolvedValueOnce([[], undefined]);
    db.execute.mockResolvedValueOnce([[], undefined]);

    const result = await getHomeScreen(1, 1);

    expect(result.reviews).toHaveLength(0);
    expect(result.books).toHaveLength(0);
  });
});
