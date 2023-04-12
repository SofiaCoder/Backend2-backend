const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authMiddleware = function authMiddleware(req, res, next) {
    const { authKey } = req.cookies

    if(!authKey) {
        res.status(401).send('Missing authentication token')
        return;
    }

    try {
        const decoded = jwt.verify(authKey, process.env.secret)
        const { id } = decoded
        req.userID = id
        next()
    } catch (error){
        res.status(401).send('Wrong or invalid token' + error)
    }
}