const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { createHmac } = require("crypto");
const { makeUserToken } = require("../services/authjwt");

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
  console.log(req.body);
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) res.json("invalid email");
  const salt = user.salt;
  const givenHashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  if (givenHashedPassword !== user.password) res.json("invalid password");
  const token = makeUserToken(user);
  return res
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // true in production with https
    })
    .json({ message: "Logged in" });
});
router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

module.exports = router;
