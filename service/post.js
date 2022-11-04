import { createEncryptPassword, createSalt } from '../util/encryptPassword.js';

import { BadRequestException } from '../util/exception/badRequest.exception.js';
import db from '../db/database.js';

async function createPost(userId, password, title, content) {
  const user = await db.User.findById(userId);
  if (!user) {
    throw new BadRequestException('INVALID VALUE');
  }
  const salt = await createSalt();
  const encryptPassword = await createEncryptPassword(password, salt);

  db.Post.createPost(userId, encryptPassword, salt, title, content);
}

async function getPosts(id, createAt) {
  return await db.Post.getPosts(id, createAt);
}

async function updatePost(id, content, title) {
  const post = await db.Post.findById(id);
  if (!post) {
    throw new BadRequestException('INVALID VALUE');
  }
  db.Post.updatePost(id, content, title);
}

export default {
  createPost,
  getPosts,
  updatePost,
};
