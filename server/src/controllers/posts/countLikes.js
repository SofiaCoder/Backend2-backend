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
        const conditionQuery = {
            _id: postIDtoGet,
            likes: 1
        }

        const result = await postsCollection.countDocuments(conditionQuery)
        if(result === 0) {
            res.status(500).json({likesAmount: 0})
        } else {
            res.status(200).json(result)
        }

    } catch (error) {
        res.status(500).send(`Internal server error - ${error}`)
    }
}