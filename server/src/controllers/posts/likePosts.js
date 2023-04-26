const main = require('../../databas');
const joi = require('joi');
const { ObjectId } = require('mongodb');

exports.likePosts = async function likePosts(req, res) {
    try {
        const { postsCollection } = await main()

        const schema = joi.object({
            likeValue: joi.number().min(0).max(1).required(),
            postID: joi.string().required()
        })

        const { value, error } = schema.validate(req.body)

        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        const { likeValue, postID } = value;
        const postIDtoPatch = new ObjectId(postID);

        const result = await postsCollection.updateOne({_id: postIDtoPatch}, {$set: {likes: likeValue}}, {upsert: true})
        if (result.modifiedCount === 0) {
            res.status(404).send('Query didnt match any document. 0 document changed.')
        } else {
            res.status(200).send('Like value updated')
        }
        

    } catch (error) {
        res.status(500).send(`Internal server error - ${error}`)
    }
}