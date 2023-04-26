const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const main = require("../../databas");
const joi = require("joi");

exports.login = async function login(req, res) {
  try {
    const schema = joi.object({
      username: joi.string().min(1).max(25).required(),
      password: joi.string().min(4).required(),
    });

    const { value, error } = schema.validate(req.body);
    if (error) {
      return res.status(401).send(error.details[0].message);
    }

    const { username, password } = value;
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
    res.cookie("authKey", token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
      //secure: true,
    });
    res.status(200).json({ message: "Successfully login" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
