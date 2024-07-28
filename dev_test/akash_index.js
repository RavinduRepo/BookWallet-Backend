const express = require("express");
const app = express();

app.use(express.json());

const port = process.env.PORT || 2000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
const userRoutes = require("../routes/userRoutes");
app.use("/api", userRoutes);

app.use("/api/book-review", bookReviewRoutes);
