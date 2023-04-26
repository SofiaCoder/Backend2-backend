const main = require("../../databas");
const { ObjectId } = require('mongodb');

exports.getFollowedUsersPosts = async function getFollowedUsersPosts(req, res) {
    try {
        const { usersCollection, postsCollection } = await main();
        const userID = req.userID;
        userIDtoFind = new ObjectId(userID)

        const user = await usersCollection.findOne({ _id: userIDtoFind })
        if(!user || user.length === 0) {
            return res.status(404).send('No user was found.')
        }
        const friends = user.friends

        const allFriendsIDs = await Promise.all(friends?.map(async (friend) => {
            const friendID = await usersCollection.findOne({username: friend}, {projection: {_id: 1}})
            return friendID?._id.toString();
        }));

        const allFriendsPosts = await Promise.all(allFriendsIDs?.map(async (id) => {
            const friendPost = await postsCollection.find({user_id: id}).toArray()
            return friendPost
        }))

        const flatArray = allFriendsPosts.flat();

        if(flatArray.length === 0 || !flatArray) {
            res.status(404).send('Your friends does not have any posts jet')
        } else {
            res.status(200).json(flatArray)
        }
        
    } catch (error) {
        res.status(500).send(`Internal server error - ${error}`)
    }
}