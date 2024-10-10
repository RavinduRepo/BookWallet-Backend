const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'BookWallet',
        version: '1.0.0',
        description: 'BookWallet API documnentation'
    },
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js', './store_management/*.js', 'swagger.js']
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - username
 *              - email
 *          properties:
 *              user_id:
 *                  type: integer
 *                  description:
 *              username:
 *                  type: string
 *                  description: The user's username
 *              email:
 *                  type: string
 *                  description: The user's email address
 *              description:
 *                  type: string
 *                  description: Details about the user
 *              imageUrl:
 *                  type: string
 *                  description: URL to the user's image
 *          example:
 *              user_id: 1
 *              username: kushan
 *              email: kushan@gmail.com
 *              description: My name is Kushan
 *              imageUrl: /kushan.jpg
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      Book:
 *          type: object
 *          required:
 *              - bookId
 *              - title
 *              - ISBN10
 *              - ISBN13
 *              - publication_date
 *              - description
 *              - author
 *              - rating
 *              - pages
 *              - genre
 *              - imageUrl
 *              - resource
 *          properties:
 *              bookId:
 *                  type: integer
 *                  description:
 *              title:
 *                  type: string
 *                  description: The title of the book
 *              ISBN10:
 *                  type: string
 *                  description: The 10-character ISBN identifier
 *              ISBN13:
 *                  type: string
 *                  description: The 13-character ISBN identifier
 *              publication_date:
 *                  type: string
 *                  description: The date the book was published
 *              description:
 *                  type: string
 *                  description: A short description of the book
 *              author:
 *                  type: string
 *                  description: The author(s) of the book
 *              rating:
 *                  type: double
 *                  description: The average rating of the book
 *              pages:
 *                  type: integer
 *                  description: The total number of pages in the book
 *              genre:
 *                  type: string
 *                  description: The genre of the book
 *              imageUrl:
 *                  type: string
 *                  description: URL of the book cover image
 *              resource:
 *                  type: string
 *                  description: The resource from which the book details were obtained
 *          example:
 *              bookId: 12
 *              title: The Winds of Dune
 *              ISBN10: 184737848X
 *              ISBN13: "9781847378484"
 *              publication_date: 2009-10-01
 *              description: Between the end of Frank Herbert's DUNE and his next book...
 *              author: Kevin J. Anderson, Brian Herbert
 *              rating: 4.5
 *              pages: 592
 *              genre: Fiction
 *              imageUrl: http://books.google.com/books/content?id=BpgkiOdga...
 *              resource: Google
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      Review:
 *          type: object
 *          required:
 *              - bookId
 *              - userId
 *              - imageUrl
 *              - title
 *              - author
 *              - context
 *              - rating
 *              - date
 *              - username
 *              - likesCount
 *              - commentsCount
 *              - sharesCount
 *          properties:
 *              reviewId:
 *                  type: integer
 *                  description:
 *              bookId:
 *                  type: integer
 *                  description: The id of the book being reviewed
 *              userId:
 *                  type: integer
 *                  description: The id of the user who wrote the review
 *              imageUrl:
 *                  type: string
 *                  description: URL of the review's image
 *              title:
 *                  type: string
 *                  description: Title of the review
 *              author:
 *                  type: string
 *                  description: Author of the book being reviewed
 *              context:
 *                  type: string
 *                  description: The content of the review
 *              rating:
 *                  type: double
 *                  description: Rating given to the book in the review
 *              date:
 *                  type: string
 *                  description: Date the review was posted
 *              username:
 *                  type: string
 *                  description: Username of the reviewer
 *              likesCount:
 *                  type: integer
 *                  description: Number of likes on the review
 *              commentsCount:
 *                  type: integer
 *                  description: Number of comments on the review
 *              sharesCount:
 *                  type: integer
 *                  description: Number of times the review has been shared
 *          example:
 *              reviewId: 10
 *              bookId: 116
 *              userId: 27
 *              imageUrl: 
 *              title: 
 *              author: 
 *              context: Excellent book with great insights!
 *              rating: 4.5
 *              date: 2024-09-14
 *              username:
 *              likesCount:
 *              commentsCount:
 *              sharesCount:
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      Share:
 *          type: object
 *          required:
 *              - reviewId
 *              - sharerUsername
 *              - bookId
 *              - userId
 *              - imageUrl
 *              - title
 *              - author
 *              - context
 *              - rating
 *              - date
 *              - username
 *              - likesCount
 *              - commentsCount
 *              - sharesCount
 *              - sharerUserId
 *          properties:
 *              reviewId:
 *                  type: integer
 *                  description:
 *              sharerUsername:
 *                  type: string
 *                  description: Username of the person sharing the review
 *              bookId:
 *                  type: integer
 *                  description: The id of the book being shared
 *              userId:
 *                  type: integer
 *                  description: The id of the user who wrote the review
 *              imageUrl:
 *                  type: string
 *                  description: URL of the shared review's image
 *              title:
 *                  type: string
 *                  description: Title of the shared review
 *              author:
 *                  type: string
 *                  description: Author of the shared book
 *              rating:
 *                  type: double
 *                  description: Rating given to the book
 *              date:
 *                  type: string
 *                  description: Date of the shared review
 *              username:
 *                  type: string
 *                  description: Username of the original reviewer
 *              likesCount:
 *                  type: integer
 *                  description: Number of likes on the shared review
 *              commentsCount:
 *                  type: integer
 *                  description: Number of comments on the shared review
 *              sharesCount:
 *                  type: integer
 *                  description: Number of times the review has been shared
 *              sharerUserId:
 *                  type: integer
 *                  description: The id of the user who is sharing the review
 *          example:
 *              reviewId:
 *              sharerUsername:
 *              bookId: 116
 *              userId: 27
 *              imageUrl: 
 *              title: 
 *              author: 
 *              context: Excellent book with great insights!
 *              rating: 4.5
 *              date: 2024-09-14
 *              username:
 *              likesCount:
 *              commentsCount:
 *              sharesCount:
 *              sharerUserId:
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      Store:
 *          type: object
 *          required:
 *              - storeId
 *              - name
 *              - category
 *              - locatedCity
 *              - phoneNumber
 *              - locationLink
 *          properties:
 *              storeId:
 *                  type: integer
 *                  description:
 *              name:
 *                  type: string
 *                  description: Store name
 *              category:
 *                  type: string
 *                  description: 
 *              locatedCity:
 *                  type: string
 *                  description: 
 *              phoneNumber:
 *                  type: string
 *                  description: 
 *              locationLink:
 *                  type: string
 *                  description: 
 *          example:
 *              storeId: 1
 *              name: Sarasavi Bookshop
 *              category: Books
 *              locatedCity: Piliyandala
 *              phoneNumber: 0785104489
 *              locationLink: https://maps.app.goo.gl/FZE8VLtjnmunijKH7
 */