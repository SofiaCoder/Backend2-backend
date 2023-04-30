const main = require('../../databas');
const joi = require('joi');
const { ObjectId } = require('mongodb');

exports.commentPosts = async function commentPosts(req, res) {
    try {
        const { postsCollection } = await main()
        const username = req.username
        const date = new Date()

        const schema = joi.object({
            commentBody: joi.string().min(1).max(250).required(),
            postID: joi.string().required()
        })

        const { value, error } = schema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        const { commentBody, postID } = value;
        const postIDtoInsert = new ObjectId(postID);

        const comment = {
            username,
            date,
            commentBody
        }

        const respons = await postsCollection.updateOne({_id: postIDtoInsert}, {$push: {comments: comment}})
        if(respons.matchedCount === 0) {
            res.status(404).send('Wrong id, this document was not found')
        } else {
            res.status(200).json(comment)
        }

    } catch (error) {
        res.status(500).send(`Internal server error - ${error}`)
    }
}