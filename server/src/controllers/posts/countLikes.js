const main = require('../../databas');
const joi = require('joi');
const { ObjectId } = require('mongodb');

exports.countLikes = async function countLikes(req, res) {
    try {
        const { postsCollection } = await main()

        const schema = joi.object({
            postID: joi.string().required()
        })

        const { value, error } = schema.validate(req.body)
        if(error) {
            return res.status(400).send(error.details[0].message)
        }

        const { postID } = value;
        const postIDtoGet = new ObjectId(postID)

        const result = await postsCollection.findOne({_id: postIDtoGet})
        if(!result) {
            return res.status(404).send(`No post found with id: ${postIDtoGet}`)
        }
        const likeArray = result.likes
        const amountOfLikes = likeArray.length
        
        res.status(200).json(amountOfLikes)

    } catch (error) {
        res.status(500).send(`Internal server error - ${error}`)
    }
}