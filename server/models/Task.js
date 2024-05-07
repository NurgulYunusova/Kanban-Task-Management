const { default: mongoose } = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Column",
    },
    subtasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subtask",
      },
    ],
  },
  { timestamps: true }
);

const Task = new mongoose.model("Task", taskSchema);

module.exports = {
  Task,
};
