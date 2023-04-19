const joi = require("joi")
const { ObjectId } = require('mongodb')
const main = require('../../databas')

exports.patchPosts = async function patchPosts(req, res) {
    try {
        const { postsCollection } = await main()

        const schema = joi.object({
            postID: joi.string().required(),
            newPostBody: joi.string().min(1).max(250).required()
        })

        const { value, error } = schema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        const { postID, newPostBody } = value
        const postIDtoPatch = new ObjectId(postID)
        const dateTime = new Date().toLocaleString();

        postsCollection.updateOne({_id: postIDtoPatch}, {$set: {post: newPostBody, updated: dateTime}}, { upsert: true })

        res.status(200).send(`Post updated`)
        
    } catch (error) {
        res.status(500).send(`Internal server error - ${error}`)
    }
}