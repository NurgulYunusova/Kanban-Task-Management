const express = require("express");

const { db } = require("./config/db");

const app = express();

// const { userRoutes } = require("./routes/userRoute");
// const { bookRoutes } = require("./routes/bookRoute");

// require("dotenv").config();

db.connect();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use("/api/user", userRoutes);
// app.use("/api/book", bookRoutes);
// app.use("/api/author", authorRoutes);
// app.use("/api/category", categoryRoutes);
// app.use("/api/question", questionRoutes);
// app.use("/api/quiz", quizRoutes);
// app.use("/api/review", reviewRoutes);
// app.use("/api/wishlist", wishlistRoutes);
// app.use("/api/basket", basketRoutes);
// app.use("/api/order", orderRoutes);

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
