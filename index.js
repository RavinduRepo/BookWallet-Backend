require("dotenv").config();
const db = require("./config/dbConfig");
const express = require("express");
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

require("./updatetrending");

app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/image", imageRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/search", seachRoutes);
app.use("/api/user", userRoutes, bookRecommendRoutes, userfollowRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/book-review", bookReviewRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/home-screen", homeScreenroutes);
app.use("/api/history", historyRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/saved-items", savedItemsRoutes);
app.use("/api/trending", trendingRoutes);
app.use("/api/books", bookStatusCheckingRoutes); //book wishlist and save status

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
