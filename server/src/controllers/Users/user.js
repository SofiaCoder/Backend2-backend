const main = require("../../databas");

const searchUsers = async (req, res) => {
  const { username } = req.params;
  const { usersCollection, postsCollection } = await main();

  const user = await usersCollection.findOne({
    username: username.toLowerCase(),
  });

  if (!user) {
    return res.status(404).json({ message: "Användaren finns inte" });
  }

  const searchedUserId = user._id.toString();
  const posts = await postsCollection
    .find({ user_id: searchedUserId })
    .toArray();

  return res
    .status(200)
    .json({ username: user.username, friends: user.friends, posts: posts });
};

exports.searchUsers = searchUsers;
