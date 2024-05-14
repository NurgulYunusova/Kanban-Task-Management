const express = require("express");
const { boardController } = require("../controllers/boardController");

const boardRoutes = express.Router();

boardRoutes.post("/", boardController.createBoard);
boardRoutes.get("/", boardController.getAllBoards);
boardRoutes.get("/user/:id", boardController.getAllBoardsByUserId);
// boardRoutes.put("/:id", boardController.updateBoard);
boardRoutes.delete("/:id", boardController.deleteBoard);

module.exports = {
  boardRoutes,
};
