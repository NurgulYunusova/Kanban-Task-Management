const express = require("express");
const cors = require("cors");

const { db } = require("./config/db");

const app = express();

const { userRoutes } = require("./routes/userRoute");
const { boardRoutes } = require("./routes/boardRoute");
const { taskRoutes } = require("./routes/taskRoute");
const { subtaskRoutes } = require("./routes/subtaskRoute");

require("dotenv").config();

db.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/board", boardRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/subtask", subtaskRoutes);

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
