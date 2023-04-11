const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./models/user");
const Session = require("./models/session");

const app = express();

app.use(express.json());

mongoose.connect(
  "mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(400).send("Username already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({ username, password: hashedPassword });
  await user.save();

  res.send("Registration successful");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).send("Invalid username or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).send("Invalid username or password");
  }

  const token = jwt.sign({ userId: user._id }, "secret");

  const session = new Session({ userId: user._id, token });
  await session.save();

  res.json({ token });
});

const validateSession = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("Missing authorization token");
  }

  const session = await Session.findOne({ token }).populate("userId");

  if (!session) {
    return res.status(401).send("Invalid authorization token");
  }

  req.user = session.userId;
  next();
};

app.get("/dashboard", validateSession, (req, res) => {
  res.send(`Welcome, ${req.user.username}!`);
});
