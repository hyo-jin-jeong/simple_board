import authentication from '../middleware/authentication.js';
import express from 'express';
import postController from '../controller/post.js';
const router = express.Router();

router.post('/', postController.createPost);
router.get('/', postController.getPosts);
router.put('/:id', authentication, postController.updatePost);
export default router;
