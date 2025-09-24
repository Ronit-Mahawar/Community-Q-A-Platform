const express = require("express");
const cors = require("cors");
const { mongooDbConnect } = require("./connection");
const { default: mongoose } = require("mongoose");
const userRouter = require("./routers/user");
const postRouter = require("./routers/post");
const commentRouter = require("./routers/comment");
mongooDbConnect("mongodb://127.0.0.1:27017/qna");
const User = require("./models/user");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 9000;
app.use(
  cors({
    origin: "http://localhost:5173", // frontend origin
    credentials: true, // allow cookies
  })
);
app.listen(PORT, console.log(`Server Started at PORT:${PORT}`));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  return res.json("hello");
});
// User.create({
//   fullName: "ronit",
//   email: "ronitmahawar18@gmail.com",
//   password: "12345678",
// });

app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);
