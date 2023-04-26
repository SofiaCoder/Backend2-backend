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
        const { friendname } = value;
        userIDtoinsert = new ObjectId(userID)

        const response = usersCollection.updateOne({_id: userIDtoinsert}, {$push: {friends: friendname}})
        if(response.matchedCount === 0) {
            res.status(404).send(`Wrong user id, ${userIDtoinsert} was not found`)
        } else {
            res.status(200).send(`You're now following ${friendname}`)
        }
        
    } catch (error) {
        res.status(500).send(`Internal server error - ${error}`)
    }
}