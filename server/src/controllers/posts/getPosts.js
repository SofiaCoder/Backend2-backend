const main = require("../../databas");

exports.getPosts = async function getPosts(req, res) {
    try {
        const userID = req.userID

        const { postsCollection } = await main();

        const posts = await postsCollection.find({user_id: userID}).toArray()
        if(posts.length === 0) {
            res.status(404).send('No posts found in database')
        } else {
            res.status(200).json(posts)
        }
        
    } catch (error) {
        res.status(500).send(`Internal server error - ${error}`)
    }
}