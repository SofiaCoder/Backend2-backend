const express = require('express');
const postRouter = express.Router();
const { getPosts } = require('../controllers/posts/getPosts');
const { postPosts } = require('../controllers/posts/postPosts');
const { patchPosts } = require('../controllers/posts/patchPosts');
const { deletePosts } = require('../controllers/posts/deletePosts');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { commentPosts } = require('../controllers/posts/commentPosts');
const { likePosts } = require('../controllers/posts/likePosts');
const { countLikes } = require('../controllers/posts/countLikes');

postRouter.use(authMiddleware)

postRouter.get('/', getPosts)
postRouter.post('/', postPosts)
postRouter.patch('/', patchPosts)
postRouter.delete('/', deletePosts)
postRouter.post('/comment', commentPosts)
postRouter.patch('/like', likePosts)
postRouter.post('/like', countLikes)


exports.postRouter = postRouter