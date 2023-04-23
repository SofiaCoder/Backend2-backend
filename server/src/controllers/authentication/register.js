const bcrypt = require("bcrypt");
const main = require("../../databas");
const joi = require('joi')

exports.register = async function register(req, res) {
  try {
    const schema = joi.object({
      username: joi.string().min(1).max(25).required(),
      password: joi.string().min(4).required()
    })

    const { value, error } = schema.validate(req.body)
    if(error) {
      return res.status(400).send(error.details[0].message)
    }
    
    const { username, password } = value;
    const { usersCollection } = await main();

    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword, friends: [] };
    await usersCollection.insertOne(newUser);

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


