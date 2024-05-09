const moment = require("moment");
const { Board } = require("../models/Board");
const { Column } = require("../models/Column");
const { User } = require("../models/User");

const boardController = {
  createBoard: async (req, res) => {
    try {
      const { name, userId, columnNames } = req.body;

      const existingBoards = await Board.find({ user: userId });
      const isActive = existingBoards.length === 0;

      const board = new Board({
        name: name,
        user: userId,
        isActive: isActive,
      });

      await board.save();

      const columns = [];
      for (const columnName of columnNames) {
        const column = new Column({
          name: columnName,
          board: board._id,
          tasks: [],
        });
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
  getAllBoardsByUserId: async (req, res) => {
    try {
      const userId = req.params.id; // Assuming userId is passed as a parameter in the route

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const boards = await Board.find({ user: userId }).populate("columns");
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
