import {
  BadRequestException,
  UnauthorizedException,
} from '../util/exception/index.js';

import { createEncryptPassword } from '../util/encryptPassword.js';
import db from '../db/database.js';

const authentication = async (req, res, next) => {
  const postId = req.params.id;
  const { password } = req.body;
  if (!password) {
    throw new BadRequestException('INVALID VALUE');
  }

  const post = await db.Post.findById(postId);
  if (!post) {
    throw new BadRequestException('INVALID VALUE');
  }
  const encryptPassword = await createEncryptPassword(password, post.salt);
  if (encryptPassword !== post.password) {
    throw new UnauthorizedException('INVALID AUTH');
  }
  next();
};

export default authentication;
