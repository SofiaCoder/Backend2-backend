const express = require('express')
const server = express()
const { authRouter } = require('./routes/authRouter')
const { postRouter } = require('./routes/postRouter')
server.use(express.json());


server.use("/auth", authRouter);
server.use("/post", postRouter);

exports.server = server;
