const express = require('express')
const server = express()

server.post('/login', (req, res) => {
    res.send('You got a post login')
})

server.post('/register', (req, res) => {
    res.send('You got a post register')
})

server.listen(5050)