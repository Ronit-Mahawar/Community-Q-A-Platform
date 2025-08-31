const express = require("express");
const router = express.Router();
const Post = require("../models/post");

router.post("/addPost", async (req, res) => {
  const { title, body, img, tags } = req.body;
  await Post.create({
    title: title,
    body: body,
    tags: tags,
  });
  return res.json("post added");
});
router.get("/", (req, res) => {
  return res.json("get of post");
});

module.exports = router;
