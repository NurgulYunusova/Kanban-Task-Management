const { Subtask } = require("../models/Subtask");

const subtaskController = {
  changeIsCompleted: async (req, res) => {
    try {
      const subtaskId = req.params.id;

      const subtask = await Subtask.findById(subtaskId);

      if (!subtask) {
        return res.status(404).json({ error: "Subtask not found" });
      }

      subtask.isCompleted = !subtask.isCompleted;

      await subtask.save();

      res.json({ subtask });
    } catch (error) {
      console.error("Error changing subtask completion:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = {
  subtaskController,
};
