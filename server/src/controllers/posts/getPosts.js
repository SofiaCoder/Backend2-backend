const main = require("../../databas");

exports.getPosts = async function getPosts(req, res) {
    try {
        const userID = req.userID

        const { postsCollection } = await main();

        const posts = await postsCollection.find({user_id: userID}).toArray()
        
        res.status(200).send(posts)
    } catch (error) {
        res.status(500).send(`Internal server error - ${error}`)
    }
}