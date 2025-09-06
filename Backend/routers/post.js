const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const checkForAuth = require("../middlewear/auth");

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
router.get("/", async (req, res) => {
  let { page = 1, limit = 10 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);
  try {
    const posts = await Post.find()
      .populate("postBy", "fullName")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Post.countDocuments();
    const totalPages = Math.ceil(total / limit);

    res.json({
      posts: posts,
      totalPages: totalPages,
      currentPage: page,
    });
  } catch (err) {
    console.err(err);

    res.status(500).json({ error: err.msg });
  }
});

module.exports = router;
