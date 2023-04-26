const express = require("express");
const { searchUsers } = require("../controllers/Users/user");
const userRouter = express.Router();

userRouter.get("/:username", searchUsers);

exports.userRouter = userRouter;
