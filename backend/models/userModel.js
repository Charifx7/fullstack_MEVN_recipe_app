const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the username"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add the password"],
    },
    role: {
      type: String,
      required: [true, "Please add the role"],
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
