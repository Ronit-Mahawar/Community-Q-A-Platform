const express = require("express");
const { checkForAuth } = require("../middlewear/auth");
const Comment = require("../models/comment");
const router = express.Router();

router.post("/:id", checkForAuth("token"), async (req, res) => {
  try {
    const { content, parentComment } = req.body;
    const postId = req.params.id;

    const comment = await Comment.create({
      user: req.user._id,
      content: content,
      post: postId,
    });
    return res.json(comment);
  } catch (err) {
    console.error(err);
    return res.status(404).json({ error: "error" });
  }
});
router.get("/:id", async (req, res) => {
  const postId = req.params.id;
  console.log("postId", postId);

  try {
    const comments = await Comment.find({
      post: postId,
      parentComment: null,
    });
    return res.json(comments);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
