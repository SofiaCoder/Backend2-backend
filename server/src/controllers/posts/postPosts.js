const joi = require("joi");
const { ObjectId } = require("mongodb");
const main = require("../../databas");

exports.postPosts = async function postPosts(req, res) {
  try {
    const { postsCollection, usersCollection } = await main();
    const userID = req.userID;
    const username = req.username;

    const schema = joi.object({
      postBody: joi.string().min(1).max(250).required(),
    });

    const { value, error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const { postBody } = value;
    const dateTime = new Date().toLocaleString();

    const post = {
      user_id: userID,
      username: username,
      date: dateTime,
      post: postBody,
      comments: [],
      likes: []
    }
    postsCollection.insertOne(post);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).send(`Internal server error - ${error}`);
  }
};
