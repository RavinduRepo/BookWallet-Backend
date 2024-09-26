require("dotenv").config();
const db = require("./config/dbConfig");
const express = require("express");
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const basicAuth = require('basic-auth-connect');
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const imageRoutes = require("./routes/imageRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const seachRoutes = require("./routes/searchRoutes");
const userRoutes = require("./routes/userRoutes");
const bookReviewRoutes = require("./routes/addBookandReviewRoutes");
const userfollowRoutes = require("./routes/userfollowRoutes");
const bookRoutes = require("./routes/bookRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const bookRecommendRoutes = require("./routes/bookRecommendRoutes");
const homeScreenroutes = require("./routes/homeScreenRoutes");
const historyRoutes = require("./routes/historyRoutes");
const groupRoutes = require("./routes/groupRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const storeRoutes = require("./store_management/storeRoutes");
const savedItemsRoutes = require("./routes/savedItemsRoutes");
const trendingRoutes = require("./routes/trendingRoutes");
const bookStatusCheckingRoutes = require("./routes/bookStatusCheckingRoutes");
const app = express();
const PORT = process.env.PORT || 3000;

// Serve Swagger documentation
app.use('/api-docs',basicAuth('BookwalletDoc', 'BookWalletDocP@ssw0rd'), swaggerUI.serve, swaggerUI.setup(swaggerSpec));

require("./updatetrending");

app.use(bodyParser.json());

app.use("/api/auth", authRoutes); // 4 Ravindu
app.use("/api/posts", postRoutes); // 1 Ravindu
app.use("/api/image", imageRoutes); // 2 Kushan
app.use("/api/reviews", reviewRoutes); // 21 Akash
app.use("/api/search", seachRoutes); // 3 Ravindu
app.use("/api/user", userRoutes, bookRecommendRoutes, userfollowRoutes); // 11 Kushan
app.use("/api/wishlist", wishlistRoutes); // 4 Praveen
app.use("/api/book-review", bookReviewRoutes); // 1 Kushan
app.use("/api/book", bookRoutes); // 5 Kushan
app.use("/api/home-screen", homeScreenroutes); // 1 Kushan
app.use("/api/history", historyRoutes); // 6 Akash
app.use("/api/groups", groupRoutes); // 11 Ravindu
app.use("/api/notification", notificationRoutes); // 4 Praveen
app.use("/api/stores", storeRoutes); // 1 Kushan
app.use("/api/saved-items", savedItemsRoutes); // 11 Praveen
app.use("/api/trending", trendingRoutes); // 1 Praveen
app.use("/api/books", bookStatusCheckingRoutes); // 1 Praveen

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
