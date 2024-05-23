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
  changeStatus: async (req, res) => {
    const taskId = req.params.id;
    const userId = req.params.userId;
    const { newStatus } = req.body;

    try {
      const task = await Task.findById(taskId);

      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      if (task.status._id.toString() === newStatus) {
        return res.status(201).json({ message: "Status is the same", task });
      }

      const currentColumn = await Column.findById(task.status);
      currentColumn.tasks.pull(taskId);
      await currentColumn.save();

      const newColumn = await Column.findById(newStatus);
      newColumn.tasks.push(taskId);
      await newColumn.save();

      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { status: newStatus },
        { new: true }
      );

      const boards = await Board.find({ user: userId }).populate({
        path: "columns",
        populate: {
          path: "tasks",
          populate: {
            path: "subtasks",
          },
        },
      });

      res
        .status(200)
        .json({ message: "Task status updated", task: updatedTask, boards });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },
};

module.exports = {
  taskController,
};
