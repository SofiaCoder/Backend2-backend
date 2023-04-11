exports.login = function login(req, res) {
  res.send("You got a post login");
};

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const main = require("./database");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const { usersCollection } = await main();

    const user = await usersCollection.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
