const express = require("express");
const { boardController } = require("../controllers/boardController");

const boardRoutes = express.Router();

boardRoutes.post("/", boardController.createBoard);
boardRoutes.get("/", boardController.getAllBoards);

module.exports = {
  boardRoutes,
};
