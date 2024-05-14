const { Board } = require("../models/Board");
const { Column } = require("../models/Column");
const { Subtask } = require("../models/Subtask");
const { Task } = require("../models/Task");

const taskController = {
  createTask: async (req, res) => {
    try {
      const { title, description, status, subtaskNames } = req.body;

      const boardId = req.params.id;
      const board = await Board.findById(boardId).populate("columns");

      if (!board) {
        return res.status(404).json({ error: "Board not found" });
      }

      const column = board.columns.find((col) => col._id == status);

      if (!column) {
        return res.status(400).json({ error: "Invalid status" });
      }

      const newTask = new Task({
        title,
        description,
        status,
      });

      const subtasks = [];

      for (const subtaskName of subtaskNames) {
        const subtask = new Subtask({
          title: subtaskName,
          task: newTask._id,
          isCompleted: false,
        });

        await subtask.save();
        subtasks.push(subtask);
      }

      newTask.subtasks = subtasks;

      column.tasks.push(newTask._id);

      await column.save();
      await newTask.save();

      res.status(201).json(newTask);
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = {
  taskController,
};
