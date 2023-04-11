const express = require('express')
const server = express()
server.use(express.json());

const { authRouter } = require('./routes/authRouter')
const { postRouter } = require('./routes/postRouter')


server.use('/auth', authRouter)
server.use('/post', postRouter)


exports.server = server