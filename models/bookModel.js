class Book {
    constructor(title, ISBN10, ISBN13, publishedDate, description, author, totalRating, pages, genre, imageUrl, resource) {
      this.title = title;
      this.ISBN10 = ISBN10;
      this.ISBN13 = ISBN13;
      this.publishedDate = publishedDate;
      this.description = description;
      this.author = author;
      this.totalRating = totalRating;
      this.pages = pages;
      this.genre = genre;
      this.imageUrl = imageUrl;
      this.resource = resource;
    }
  }
  
module.exports = Book;
