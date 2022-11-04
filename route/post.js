import express from 'express';
import postController from '../controller/post.js';

const router = express.Router();

router.post('/', postController.createPost);
router.get('/', postController.getPosts);
export default router;
