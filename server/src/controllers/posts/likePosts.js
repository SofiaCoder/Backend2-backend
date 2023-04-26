const main = require('../../databas');
const joi = require('joi');
const { ObjectId } = require('mongodb');

exports.likePosts = async function likePosts(req, res) {
    try {
        const { postsCollection } = await main()
        const username = req.username

        const schema = joi.object({
            postID: joi.string().required()
        })

        const { value, error } = schema.validate(req.body)

        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        const { postID } = value;
        const postIDtoPatch = new ObjectId(postID);

        const post = await postsCollection.findOne({_id: postIDtoPatch})
        const likeArray = post.likes
        const usersHasLiked = likeArray.findIndex(user => user === username)

        if(usersHasLiked !== -1) {
            return res.status(400).send("User already liked this post")
        }       

        const result = await postsCollection.updateOne({_id: postIDtoPatch}, {$push: {likes: username}})
        if (result.modifiedCount === 0) {
            res.status(404).send('Query didnt match any document. 0 document changed.')
        } else {
            res.status(200).send('User liked this post')
        }

    } catch (error) {
        res.status(500).send(`Internal server error - ${error}`)
    }
}