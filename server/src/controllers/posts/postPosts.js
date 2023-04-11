const joi = require('joi');

exports.postPosts = function postPosts(req, res) {
    const schema = joi.object({
        postBody: joi.string().min(1).max(250).required()
    })
    
    const { value, error } = schema.validate(req.body)
    if(error) {
        res.status(400).send(error.details[0].message)
        return;
    }

    const body = value;

    

    res.send(body)
}