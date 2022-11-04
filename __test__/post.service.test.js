import * as encryptPassword from '../util/encryptPassword.js';

import { BadRequestException } from '../util/exception/badRequest.exception.js';
import db from '../db/database.js';
import postService from '../service/post.js';

describe('post controller test', () => {
  let id, userId, password, title, content;
  beforeEach(() => {
    id = 1;
    userId = 1;
    password = 'abcd134';
    title = '프로젝트 진행중';
    content =
      '이번 프로젝트는 게시글 생성, 수정, 삭제 구현을 하는 프로젝트이다.';
  });

  describe('post create test', () => {
    it('성공 할 경우', async () => {
      const hashPassword = 'hashValue';
      const salt = 'salt';
      db.User.findById = jest.fn(() => {
        return { id, name: 'jin' };
      });
      db.Post.createPost = jest.fn();
      encryptPassword.createEncryptPassword = jest.fn(() => hashPassword);
      encryptPassword.createSalt = jest.fn(() => salt);

      await postService.createPost(userId, password, title, content);

      expect(db.User.findById).toBeCalledTimes(1);
      expect(db.User.findById).toBeCalledWith(userId);
      expect(db.Post.createPost).toBeCalledTimes(1);
      expect(db.Post.createPost).toBeCalledWith(
        userId,
        hashPassword,
        salt,
        title,
        content
      );
    });
    it('return BadRequestError 존재하지 않는 user인 경우', async () => {
      db.User.findById = jest.fn();

      expect(async () => {
        await postService.createPost(userId, password, title, content);
      }).rejects.toThrowError(BadRequestException);
    });
  });

  describe('post update test', () => {
    it('', async () => {
      db.Post.findById = jest.fn(() => {
        return {
          id,
          password,
          title,
          content,
        };
      });
      db.Post.updatePost = jest.fn();

      await postService.updatePost(id, content, title);

      expect(db.Post.findById).toBeCalledTimes(1);
      expect(db.Post.findById).toBeCalledWith(id);
      expect(db.Post.updatePost).toBeCalledTimes(1);
      expect(db.Post.updatePost).toBeCalledWith(id, content, title);
    });
    it('return BadRequestError 존재하지 않는 post인 경우', async () => {
      db.Post.findById = jest.fn();

      expect(async () => {
        await postService.updatePost(id, content, title);
      }).rejects.toThrowError(BadRequestException);
    });
  });
});
