const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const { checkForAuth, OptionalAuth } = require("../middlewear/auth");
const PostVote = require("../models/postVote");

router.post("/addPost", checkForAuth("token"), async (req, res) => {
  const { title, body, img, tags } = req.body;
  console.log(req.user);
  await Post.create({
    title: title,
    body: body,
    tags: tags,
    postBy: req.user._id,
  });
  return res.json("post added");
});
router.get("/", OptionalAuth("token"), async (req, res) => {
  let { page = 1, limit = 5 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);
  try {
    const posts = await Post.find()
      .populate("postBy", "fullName")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await Post.countDocuments();
    const totalPages = Math.ceil(total / limit);

    const postIds = posts.map((post) => {
      return post._id;
    });
    console.log("postIds", postIds);
    let postsWithVotes = posts;
    if (req.user) {
      const votedPost = await PostVote.find({
        post: { $in: postIds },
        user: req.user._id,
      }).lean();
      postsWithVotes = posts.map((post) => {
        const vote = votedPost.find(
          (v) => v.post.toString() === post._id.toString()
        );
        return {
          ...post,
          userVote: vote ? vote.type : null,
        };
      });
      res.json({
        posts: postsWithVotes,
        totalPages: totalPages,
        currentPage: page,
      });
    } else {
      // No user → just add null for userVote
      postsWithVotes = posts.map((post) => ({
        ...post,
        userVote: null,
      }));
      console.log("postWithVOtes", postsWithVotes);

      res.json({
        posts: postsWithVotes,
        totalPages: totalPages,
        currentPage: page,
      });
    }
  } catch (err) {
    console.error(err);

    res.status(500).json({ error: err.msg });
  }
});
router.post("/:id/vote", checkForAuth("token"), async (req, res) => {
  console.log("Params:", req.params);
  const postId = req.params.id;
  console.log("postId", postId);
  let userVote = null;

  const { type } = req.body; // "upvote" or "downvote"
  const userId = req.user._id; // from auth middleware

  try {
    // Find if user already voted
    let vote = await PostVote.findOne({ post: postId, user: userId });

    if (!vote) {
      // New vote
      vote = await PostVote.create({ post: postId, user: userId, type });

      // Increment count
      if (type === "upvote") {
        userVote = "upvote";
        await Post.findByIdAndUpdate(postId, { $inc: { upvoteCount: 1 } });
      } else {
        await Post.findByIdAndUpdate(postId, { $inc: { downvoteCount: 1 } });
      }
    } else if (vote.type === type) {
      userVote = null;
      // User clicked same vote again → remove it
      await PostVote.findByIdAndDelete(vote._id);

      if (type === "upvote") {
        await Post.findByIdAndUpdate(postId, { $inc: { upvoteCount: -1 } });
      } else {
        await Post.findByIdAndUpdate(postId, { $inc: { downvoteCount: -1 } });
      }
    } else {
      // User switched vote (upvote → downvote or vice versa)
      await PostVote.findByIdAndUpdate(vote._id, { type });

      if (type === "upvote") {
        userVote = "upvote";
        await Post.findByIdAndUpdate(postId, {
          $inc: { upvoteCount: 1, downvoteCount: -1 },
        });
      } else {
        userVote = "downvote";
        await Post.findByIdAndUpdate(postId, {
          $inc: { downvoteCount: 1, upvoteCount: -1 },
        });
      }
    }
    const post = await Post.findById(postId);
    const score = post.upvoteCount - post.downvoteCount;
    console.log("user voted");

    res.json({ score: score, userVote: userVote, success: true });
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: err.message });
  }
});

module.exports = router;
