import express from 'express';
import postController from '../controller/post.js';

const router = express.Router();

router.post('/', postController.createPost);

export default router;
