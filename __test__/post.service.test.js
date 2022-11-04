import { BadRequestException } from '../util/exception/badRequest.exception.js';
import db from '../db/database.js';
import postService from '../service/post.js';

describe('post create test', () => {
  let userId, password, title, content;
  beforeEach(() => {
    userId = 1;
    password = 'abcd134';
    title = '프로젝트 진행중';
    content =
      '이번 프로젝트는 게시글 생성, 수정, 삭제 구현을 하는 프로젝트이다.';
  });

  it('return 200 성공 할 경우', async () => {
    const encryptPassword = 'encrypt';
    const salt = 'salt';
    db.User.findById = jest.fn(() => {
      return { id: 1, name: 'jin' };
    });
    db.Post.createPost = jest.fn();

    await postService.createPost(userId, password, title, content);

    expect(db.User.findById).toBeCalledTimes(1);
    expect(db.User.findById).toBeCalledWith(userId);
    expect(db.Post.createPost).toBeCalledTimes(1);
    // expect(db.Post.createPost).toBeCalledWith(
    //   userId,
    //   encryptPassword,
    //   salt,
    //   title,
    //   content
    // );
  });
  it('return BadRequestError 존재하지 않는 user인 경우', async () => {
    db.User.findById = jest.fn();

    expect(async () => {
      await postService.createPost(userId, password, title, content);
    }).rejects.toThrowError(BadRequestException);
  });
});
