const { MongoClient } = require('mongodb')
require('dotenv').config()

async function main(){
    const url = process.env.DB_URL

    const connection = await MongoClient.connect(url);

    const database = connection.db('backend2');

    const collection = database.collection('users');

    const firstCollection = await collection.find().toArray();

    console.log(firstCollection);
    
}
 
main()