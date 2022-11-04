import config from '../config.js';
import crypto from 'crypto';

export const createSalt = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) reject(err);
      resolve(buf.toString('base64'));
    });
  });
};

export const createEncryptPassword = async (plainPassword, salt) => {
  console.log(plainPassword);
  return new Promise(async (resolve, reject) => {
    crypto.pbkdf2(
      plainPassword,
      salt,
      config.keyStretching,
      64,
      config.algorithm,
      (err, key) => {
        if (err) reject(err);
        resolve(key.toString('base64'));
      }
    );
  });
};
