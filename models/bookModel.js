class Book {
    constructor(title, author, pages, genre, ISBN10, ISBN13, totalRating, publishedDate, imageUrl, description, resource) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.genre = genre;
        this.ISBN10 = ISBN10;
        this.ISBN13 = ISBN13;
        this.totalRating = totalRating;
        this.publishedDate = publishedDate;
        this.imageUrl = imageUrl;
        this.description = description;
        this.resource = resource;
    }
  }
  
module.exports = Book;
