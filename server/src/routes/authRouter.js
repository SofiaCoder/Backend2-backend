const express = require("express");
const authRouter = express.Router();
const { login } = require("../controllers/authentication/login");
const { register } = require("../controllers/authentication/register");

authRouter.post("/login", login);
authRouter.post("/register", register);

exports.authRouter = authRouter;
