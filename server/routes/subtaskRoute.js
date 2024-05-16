const express = require("express");
const { subtaskController } = require("../controllers/subtaskController");

const subtaskRoutes = express.Router();

subtaskRoutes.put("/:id", subtaskController.changeIsCompleted);

module.exports = {
  subtaskRoutes,
};
