import { BadRequestException } from '../util/exception/index.js';
import postService from '../service/post.js';

async function createPost(req, res) {
  const { userId, password, title, content } = req.body;
  const passwordReq = /[0-9]/;
  if (
    !userId ||
    password < 6 ||
    !passwordReq.test(password) ||
    !title ||
    title.length > 20 ||
    !content ||
    content.length > 200
  ) {
    throw new BadRequestException('INVALID VALUE');
  }
  await postService.createPost(userId, password, title, content);

  res.status(201).json({ message: 'CREATED SUCCESS' });
}

async function getPosts(req, res) {
  const { id, createdAt } = req.body.pagination;

  const posts = await postService.getPosts(id, createdAt);

  res.status(200).json({ data: posts });
}

export default {
  createPost,
  getPosts,
};
