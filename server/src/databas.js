const { MongoClient } = require("mongodb");
require("dotenv").config();

let client;

async function main() {
  const url = process.env.DB_URL;

  if (! client) {
    client = await MongoClient.connect(url);
  }

  const database = client.db("backend2");

  const usersCollection = database.collection("users");
  const postsCollection = database.collection('posts');

  return { usersCollection, postsCollection, client };
}

module.exports = main;
