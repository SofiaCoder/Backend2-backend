const joi = require('joi')
const main = require('../../databas')
const { ObjectId } = require('mongodb')

exports.deletePosts = async function deletePosts(req, res) {
    try {
        const { postsCollection } = await main();
        const schema = joi.object({
            postID: joi.string()
        })

        const { value, error } = schema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        const { postID } = value
        const postIDtoDelete = new ObjectId(postID)

        const posts = await postsCollection.deleteOne({"_id": postIDtoDelete})
        if (posts.deletedCount === 1) {
            res.status(200).send(`Post deleted successfully`)
        } else {
            res.status(404).send(`Query didnt match any document. 0 document deleted.`)
        }
    } catch (error) {
        res.status(500).send(`Internal server error - ${error}`)
    }
}