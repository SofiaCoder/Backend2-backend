const main = require("../../databas");

const searchUsers = async (req, res) => {
  const { username } = req.params;
  const { usersCollection, postsCollection } = await main();

  const user = await usersCollection.findOne({ username });
  const searchedUserId = user._id.toString();
  const posts = await postsCollection.find({user_id: searchedUserId}).toArray();

  if (user) {
    return res.status(200).json({ username: user.username, friends: user.friends, posts: posts });
  } else {
    return res.status(401).json({ message: "User not found" });
  }
};

exports.searchUsers = searchUsers;
