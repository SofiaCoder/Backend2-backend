const express = require('express')
const server = express()
const { authRouter } = require('./routes/authRouter')
const { postRouter } = require('./routes/postRouter')
const cookieParser = require('cookie-parser');
server.use(express.json());
server.use(cookieParser());

server.use("/auth", authRouter);
server.use("/post", postRouter);

exports.server = server;
