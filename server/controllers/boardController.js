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
      const userId = req.params.id;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const boards = await Board.find({ user: userId }).populate({
        path: "columns",
        populate: {
          path: "tasks",
          populate: {
            path: "subtasks",
          },
        },
      });
      res.json(boards);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  deleteBoard: async (req, res) => {
    try {
      const boardId = req.params.id;

      const board = await Board.findById(boardId);

      if (!board) {
        return res.status(404).json({ message: "Board not found" });
      }

      const columnIds = board.columns;

      for (const columnId of columnIds) {
        await Column.findByIdAndDelete(columnId);
      }

      await Board.findByIdAndDelete(boardId);

      await User.updateMany(
        { boards: boardId },
        { $pull: { boards: boardId } }
      );

      res
        .status(200)
        .json({ message: "Board and associated columns deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete board", error });
    }
  },
  // updateBoard: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const { name, columns } = req.body;

  //     const board = await Board.findById(id).populate("columns");

  //     if (!board) {
  //       return res.status(404).json({ message: "Board not found" });
  //     }

  //     board.name = name;

  //     await board.save();

  //     return res
  //       .status(200)
  //       .json({ message: "Board updated successfully", board });
  //   } catch (error) {
  //     console.error("Error updating board:", error);
  //     return res.status(500).json({ message: "Internal server error" });
  //   }
  // },

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
};

module.exports = {
  boardController,
};
