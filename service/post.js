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

  await db.Post.createPost(userId, encryptPassword, salt, title, content);
}

async function getPosts(id, createAt) {
  return await db.Post.getPosts(id, createAt);
}

async function updatePost(id, content, title) {
  await db.Post.updatePost(id, content, title);
}

async function deletePost(id) {
  await db.Post.deletePost(id);
}

export default {
  createPost,
  getPosts,
  updatePost,
  deletePost,
};
