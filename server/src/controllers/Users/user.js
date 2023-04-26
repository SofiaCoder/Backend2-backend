const main = require("../../databas");

const searchUsers = async (req, res) => {
  console.log(req.body);
  const { username } = req.body;
  const { usersCollection } = await main();

  const user = await usersCollection.findOne({ username });
  if (user) {
    return res.status(200).json({ message: "User found" });
  } else {
    return res.status(401).json({ message: "User not found" });
  }
};

exports.searchUsers = searchUsers;
