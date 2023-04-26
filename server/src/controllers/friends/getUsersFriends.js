const main = require("../../databas");
const { ObjectId } = require('mongodb');

exports.getUsersFriends = async function getUsersFriends(req, res){
    try {
        const { usersCollection } = await main();
        const userID = req.userID;
        userIDtoFind = new ObjectId(userID)

        const friends = await usersCollection.find({ _id: userIDtoFind }, { projection: {_id: 0, friend: 1} }).toArray()
        if(friends[0].length === 0) {
            res.status(404).send('You´re not following anyone jet')
        }  else {
            res.status(200).json(friends)
        }
        
    } catch (error) {
        res.status(500).send(`Internal server error - ${error}`)
    }
}