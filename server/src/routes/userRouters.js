const express = require("express");
const { searchUsers } = require("../controllers/Users/user");
const userRouter = express.Router();

userRouter.get("/", searchUsers);

exports.userRouter = userRouter;
