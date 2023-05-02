const main = require("../../databas");

const searchUsers = async (req, res) => {
  const { username } = req.params;
  const { usersCollection, postsCollection } = await main();

  const user = await usersCollection.findOne({
    username: username.toLowerCase(),
  });

  if (!user) {
    return res.status(404).json({ message: "The user does not exist" });
  }

  const searchedUserId = user._id.toString();
  const posts = await postsCollection.find({ user_id: searchedUserId }).toArray();
  if(posts.length === 0) {
    return res.status(404).send('No data was found from database')
  }

  res.status(200).json({ username: user.username, friends: user.friends, posts: posts });
};

exports.searchUsers = searchUsers;
