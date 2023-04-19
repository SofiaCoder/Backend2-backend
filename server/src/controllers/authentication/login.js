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

    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1h" }
      );
    res.cookie('authKey', token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true
    })
    res.status(200).json({ message: "Successfully login", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
