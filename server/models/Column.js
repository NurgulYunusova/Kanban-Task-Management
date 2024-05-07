const { default: mongoose } = require("mongoose");

const columnSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true }
);

const Column = new mongoose.model("Column", columnSchema);

module.exports = {
  Column,
};
