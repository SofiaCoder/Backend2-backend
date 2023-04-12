const { MongoClient } = require("mongodb");
require("dotenv").config();

async function main() {
  const url = process.env.DB_URL;

  const connection = await MongoClient.connect(url);

  const database = connection.db("backend2");

  const usersCollection = database.collection("users");
  const postsCollection = database.collection('posts');

  return { usersCollection, postsCollection };
}

module.exports = main;
