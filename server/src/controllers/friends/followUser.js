const main = require("../../databas");
const joi = require('joi');
const { ObjectId } = require("mongodb");

exports.followUser = async function followUser(req, res) {
    try {
        const userID = req.userID
        const { usersCollection } = await main();
        const schema = joi.object({
            friendname: joi.string().min(1).required()
        })
        const { value, error } = schema.validate(req.body)
        if(error){
            return res.status(400).send(error.details[0].message)
        }
        const friendname = value.friendname.toLowerCase();
        userIDtoinsert = new ObjectId(userID)


        const user = await usersCollection.findOne({_id: userIDtoinsert})
        const friendArray = user.friends
        const alreadyFriend = friendArray.findIndex(friend => friend === friendname)
        
        if(alreadyFriend !== -1) {
            const result = await usersCollection.updateOne({_id: userIDtoinsert}, {$pull: {friends: friendname}})
            if(result.matchedCount === 0) {
                return res.status(404).send(`Wrong user id, ${userIDtoinsert} was not found`)
            }
            return res.status(200).send(`Unfollowed ${friendname}`)
        }
        
        const result = await usersCollection.updateOne({_id: userIDtoinsert}, {$push: {friends: friendname}})
        if(result.matchedCount === 0) {
            return res.status(404).send(`Wrong user id, ${userIDtoinsert} was not found`)
        } 
        
        res.status(200).send(`You're now following ${friendname}`)
        
    } catch (error) {
        res.status(500).send(`Internal server error - ${error}`)
    }
}