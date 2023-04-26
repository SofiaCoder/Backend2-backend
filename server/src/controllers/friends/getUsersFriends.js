const main = require("../../databas");
const { ObjectId } = require("mongodb");

exports.getUsersFriends = async function getUsersFriends(req, res) {
    try {
        const { usersCollection } = await main();

        const loggedInUserId = new ObjectId(req.userID);

        const { friends } = await usersCollection.findOne({ _id: loggedInUserId }, { projection: { _id: 0, friends: 1 } });

        if (friends.length === 0) {
            return res.status(404).send("You're not following anyone yet");
        }

        res.status(200).json(friends);
    } catch (error) {
        res.status(500).send(`Internal server error - ${error}`);
    }
};
