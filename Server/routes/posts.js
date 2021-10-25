import express from 'express';
const router = express.Router();

import { getPosts , createPosts, updatePost ,deletePost, likePost,searchposts,getPost } from '../controllers/posts.js';
import auth from '../middleware/auth.js'

router.get('/', getPosts);
router.get('/:id', getPost);
router.get('/search', searchposts);
router.post('/', auth , createPosts);
router.patch('/:id',auth, updatePost);
router.delete('/:id',auth, deletePost);
router.patch('/:id/likePost',auth, likePost);



export default router;