const express = require('express');
const postRouter = express.Router();
const { getPosts } = require('../controllers/posts/getPosts');
const { postPosts } = require('../controllers/posts/postPosts');
const { patchPosts } = require('../controllers/posts/patchPosts');
const { deletePosts } = require('../controllers/posts/deletePosts');

postRouter.get('/', getPosts)
postRouter.post('/', postPosts)
postRouter.patch('/', patchPosts)
postRouter.delete('/', deletePosts)

exports.postRouter = postRouter