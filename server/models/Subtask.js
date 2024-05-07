const { default: mongoose } = require("mongoose");

const subtaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Subtask = new mongoose.model("Subtask", subtaskSchema);

module.exports = {
  Subtask,
};
