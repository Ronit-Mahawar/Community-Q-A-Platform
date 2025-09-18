const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { createHmac } = require("crypto");
const { makeUserToken } = require("../services/authjwt");
const { checkForAuth } = require("../middlewear/auth");

router.post("/signup", async (req, res) => {
  console.log(req.body);
  const { fullName, email, password } = req.body;
  await User.create({
    fullName: fullName,
    email: email,
    password: password,
  });
  console.log("create");
  return res.json("hello");
});

router.post("/signin", async (req, res) => {
  console.log("sign in backend");
  console.log("req.body", req.body);
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) res.json("invalid email");
  const salt = user.salt;
  const givenHashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  if (givenHashedPassword !== user.password) res.json("invalid password");
  const token = makeUserToken(user);
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };

  return res
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production", // false in dev
    })
    .json({ message: "Logged in", user: payload });
});
router.post("/logout", (req, res) => {
  console.log("logout");
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  return res.json({ message: "logout" });
});
router.get("/me", checkForAuth("token"), (req, res) => {
  console.log("me");
  console.log(req.user);
  return res.json({ user: req.user });
});

module.exports = router;
