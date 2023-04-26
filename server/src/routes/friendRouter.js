const express = require("express");
const { followUser } = require("../controllers/friends/followUser");
const { getAllUsers } = require("../controllers/friends/getAllUsers");
const { getFollowedUsersPosts } = require("../controllers/friends/getFollowedUsersPosts");
const { getUsersFriends } = require("../controllers/friends/getUsersFriends");
const { authMiddleware } = require("../middlewares/authMiddleware");
const friendRouter = express.Router();

friendRouter.use(authMiddleware)

friendRouter.get("/", getAllUsers);
friendRouter.get("/posts", getFollowedUsersPosts);
friendRouter.get("/friends", getUsersFriends);
friendRouter.patch("/", followUser);

exports.friendRouter = friendRouter;