const { default: mongoose } = require("mongoose");

const boardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    columns: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Column",
      },
    ],
  },
  { timestamps: true }
);

const Board = new mongoose.model("Board", boardSchema);

module.exports = {
  Board,
};
