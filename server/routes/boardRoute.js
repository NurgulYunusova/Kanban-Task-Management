const express = require("express");
const { boardController } = require("../controllers/boardController");

const boardRoutes = express.Router();

boardRoutes.post("/", boardController.createBoard);
boardRoutes.get("/", boardController.getAllBoards);
boardRoutes.get("/user/:id", boardController.getAllBoardsByUserId);
boardRoutes.delete("/:id", boardController.deleteBoard);

module.exports = {
  boardRoutes,
};
