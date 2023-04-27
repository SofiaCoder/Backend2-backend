const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authMiddleware = function authMiddleware(req, res, next) {
    const { authKey } = req.cookies

    if(!authKey) {
        res.status(401).send('Missing authentication token')
        return;
    }

    try {
        const decoded = jwt.verify(authKey, process.env.JWT_SECRET)
        const { id, username } = decoded
        req.userID = id
        req.username = username
        
        next()
    } catch (error){
        res.status(401).send('Wrong or invalid token' + error)
    }
}