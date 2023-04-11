const express = require("express");
const loginRouter = require("./login");
const registerRouter = require("./register");
const server = require("./server");

server.use(express.json());
server.use("/login", loginRouter);
server.use("/register", registerRouter);

server.listen(5050, () => {
  console.log("Server started on port 5050");
});
