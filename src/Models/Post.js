const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      minLength: [5, "title must be at least 5 characters long"],
      maxLength: [50, "title must not exceed 50 characters"],
    },
    content: {
      type: String,
      required: [true, "content is required"],
      maxLength: [300, "content must not exceed 300 characters"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "author is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
