const mongoose = require("mongoose");

const postVoteSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["upvote", "downvote"],
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent multiple votes by the same user on the same post
postVoteSchema.index({ post: 1, user: 1 }, { unique: true });

const PostVote = mongoose.model("PostVote", postVoteSchema);

module.exports = PostVote;
