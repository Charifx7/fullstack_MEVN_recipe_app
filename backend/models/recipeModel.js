const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the recipe name"],
    },
    ingredient: {
      type: String,
      required: [true, "Please add the recipe ingredient"],
    },
    image: {
      type: String,
      required: [true, "Please add the recipe img"],
    },
    instructions: {
      type: String,
      required: [true, "Please add the recipe instructions"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Recipe", recipeSchema);
