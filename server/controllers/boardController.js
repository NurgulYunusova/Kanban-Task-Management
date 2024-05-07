const moment = require("moment");
const { Board } = require("../models/Board");
const { Column } = require("../models/Column");
const { User } = require("../models/User");

const boardController = {
  createBoard: async (req, res) => {
    try {
      const { name, userId, columnNames } = req.body;

      const board = new Board({ name, userId });
      await board.save();

      const columns = [];
      for (const columnName of columnNames) {
        const column = new Column({ name: columnName, board: board._id });
        await column.save();
        columns.push(column);
      }

      board.columns = columns;
      await board.save();

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      user.boards.push(board._id);
      await user.save();

      res.status(201).json(board);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getAllBoards: async (req, res) => {
    try {
      const boards = await Board.find().populate("columns");
      res.json(boards);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  // getBoardById: async (req, res) => {
  //   try {
  //     const board = await Board.findById(req.params.id).populate("columns");
  //     if (!board) {
  //       return res.status(404).json({ error: "Board not found" });
  //     }
  //     res.json(board);
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // },
  // updateBoard: async (req, res) => {
  //   try {
  //     const { name, isActive } = req.body;
  //     const board = await Board.findById(req.params.id);
  //     if (!board) {
  //       return res.status(404).json({ error: "Board not found" });
  //     }
  //     board.name = name;
  //     board.isActive = isActive;
  //     await board.save();
  //     res.json(board);
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // },
  // deleteBoard: async (req, res) => {
  //   try {
  //     const board = await Board.findById(req.params.id);
  //     if (!board) {
  //       return res.status(404).json({ error: "Board not found" });
  //     }
  //     await board.remove();
  //     res.json({ message: "Board deleted successfully" });
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // },
};

module.exports = {
  boardController,
};
