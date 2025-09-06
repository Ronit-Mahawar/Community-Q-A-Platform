const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,

      maxlength: 200,
    },
    body: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    postBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    votes: [
      {
        voteId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        voteType: {
          type: String,
          enum: ["upvote", "downvote"],
        },
      },
    ],

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

    upvoteCount: {
      type: Number,
      default: 0,
    },
    downvoteCount: {
      type: Number,
      default: 0,
    },
    commentCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", questionSchema);

module.exports = Post;
