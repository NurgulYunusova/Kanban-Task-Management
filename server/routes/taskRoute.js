const express = require("express");
const { taskController } = require("../controllers/taskController");

const taskRoutes = express.Router();

taskRoutes.post("/:id", taskController.createTask);
taskRoutes.put("/:id/:userId", taskController.changeStatus);

module.exports = {
  taskRoutes,
};
