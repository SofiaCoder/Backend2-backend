const express = require("express");
const server = express();
const { authRouter } = require("./routes/authRouter");
const { postRouter } = require("./routes/postRouter");
const { friendRouter } = require("./routes/friendRouter");
const cookieParser = require('cookie-parser')
const cors = require("cors");
server.use(express.json());
server.use(cookieParser());
server.use(
  cors({
    origin: "http://127.0.0.1:3000",
    credentials: true,
  })
);

server.use("/auth", authRouter);
server.use("/post", postRouter);
server.use("/friend", friendRouter);

exports.server = server;
