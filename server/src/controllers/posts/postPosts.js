const joi = require('joi');
const main = require("../../databas");

exports.postPosts = async function postPosts(req, res) {
    try {
        const { postsCollection } = await main();
        const userID = req.userID;

        const schema = joi.object({
            postBody: joi.string().min(1).max(250).required()
        })
        
        const { value, error } = schema.validate(req.body)
        if(error) {
            res.status(400).send(error.details[0].message)
            return;
        }
        const { postBody } = value;

        const dateTime = new Date().toLocaleString();
        console.log("🚀 ~ file: postPosts.js:21 ~ postPosts ~ dateTime:", dateTime)
        

        const posts = await postsCollection.insertOne({user_id: userID, date: dateTime, post: postBody})
        
        res.status(200).send(`Text posted with id: ${posts.insertedId}`)
        
    } catch (error) {
        res.status(500).send(`Internal server error - ${error}`)
    }
}