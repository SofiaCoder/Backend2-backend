const express = require("express");
const server = express();
const { authRouter } = require("./routes/authRouter");
const { userRouter } = require("./routes/userRouters");
const { postRouter } = require("./routes/postRouter");
server.use(express.json());
const cors = require("cors");
server.use(
  cors({
    origin: "http://127.0.0.1:3000",
    credentials: true,
  })
);

server.use("/user", userRouter);
server.use("/auth", authRouter);
server.use("/post", postRouter);

exports.server = server;
