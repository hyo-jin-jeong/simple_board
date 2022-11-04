import { BadRequestException } from '../util/exception/badRequest.exception.js';
import config from '../config.js';
import crypto from 'crypto';
import db from '../db/database.js';

const createSalt = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) reject(err);
      resolve(buf.toString('base64'));
    });
  });
};

const createEncryptPassword = async plainPassword => {
  return new Promise(async (resolve, reject) => {
    const salt = await createSalt();
    crypto.pbkdf2(
      plainPassword,
      salt,
      config.keyStretching,
      64,
      config.algorithm,
      (err, key) => {
        if (err) reject(err);
        resolve({ encryptPassword: key.toString('base64'), salt });
      }
    );
  });
};

async function createPost(userId, password, title, content) {
  const user = await db.User.findById(userId);
  if (!user) {
    throw new BadRequestException('INVALID VALUE');
  }
  const { encryptPassword, salt } = await createEncryptPassword(password);

  db.Post.createPost(userId, encryptPassword, salt, title, content);
}

export default {
  createPost,
};
