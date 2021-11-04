import express from 'express';
const router = express.Router();

import { getPosts , createPosts, updatePost ,deletePost, likePost,searchposts,getPost,createComment } from '../controllers/posts.js';
import auth from '../middleware/auth.js'

router.get('/search', searchposts);
router.get('/', getPosts);
router.get('/:id', getPost);

router.post('/', auth , createPosts);
router.patch('/:id',auth, updatePost);
router.delete('/:id',auth, deletePost);
router.patch('/:id/likePost',auth, likePost);
router.post('/:id/createcomment',auth, createComment);



export default router;