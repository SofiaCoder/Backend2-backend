const main = require("../../databas");

exports.getAllUsers = async function getAllUsers(req, res) {
    try {
        const { usersCollection } = await main();

        const users = await usersCollection.find({}, {projection:{ _id: 0, username: 1 }}).toArray()
        if(users[0].length === 0) {
            res.status(404).send('There were no users')
        }  else {
            res.status(200).json(users)
        }
        
    } catch (error) {
        res.status(500).send(`Internal server error - ${error}`)
    }
}