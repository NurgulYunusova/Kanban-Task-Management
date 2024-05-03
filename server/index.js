const express = require("express");

const { db } = require("./config/db");

const app = express();

const { userRoutes } = require("./routes/userRoute");
// const { bookRoutes } = require("./routes/bookRoute");

require("dotenv").config();

db.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
