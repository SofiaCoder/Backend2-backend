const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const main = require("../../databas");

exports.login = async function login(req, res) {
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

    // Set the cookie
    res.cookie("token", token, { maxAge: 3600000, httpOnly: true });

    res.status(200).json({ message: "Successfully login", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
