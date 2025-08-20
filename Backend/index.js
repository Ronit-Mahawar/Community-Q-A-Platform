const express = require("express");
const { mongooDbConnect } = require("./connection");
const { default: mongoose } = require("mongoose");
const userRouter = require("./routers/user");
mongooDbConnect("mongodb://localhost:27017/qna");
const cookieParser = require("cookie-parser");
const checkForAuth = require("./middlewear/auth");
const app = express();
const PORT = 9000;

app.listen(PORT, console.log(`Server Started at PORT:${PORT}`));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuth("token"));

app.get("/", (req, res) => {
  return res.json("hello");
});

app.use("/users", userRouter);
