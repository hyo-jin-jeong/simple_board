import { BadRequestException } from '../util/exception/index.js';
import httpMock from 'node-mocks-http';
import postController from '../controller/post.js';
import postService from '../service/post.js';

describe('post create test', () => {
  it('return 200 성공 할 경우', async () => {
    const request = httpMock.createRequest({
      url: '/posts',
      method: 'POST',
      body: {
        userId: 1,
        password: 'abcd13',
        title: '프로젝트 진행중',
        content:
          '이번 프로젝트는 게시글 생성, 수정, 삭제 구현을 하는 프로젝트이다.',
      },
    });
    const response = httpMock.createResponse();

    postService.createPost = jest.fn();

    await postController.createPost(request, response);

    expect(response.statusCode).toBe(200);
    expect(response._getJSONData().message).toBe('CREATED SUCCESS');
  });
  it('return BadRequestError userId가 없을 경우', async () => {
    const request = httpMock.createRequest({
      url: '/posts',
      method: 'POST',
      body: {
        userId: '',
        password: 'abcd13',
        title: '프로젝트 진행중',
        content:
          '이번 프로젝트는 게시글 생성, 수정, 삭제 구현을 하는 프로젝트이다.',
      },
    });
    const response = httpMock.createResponse();

    postService.createPost = jest.fn();

    expect(async () => {
      await postController.createPost(request, response);
    }).rejects.toThrowError('INVALID VALUE');
  });
  it('return BadRequestError password가 6자 이하인 경우', async () => {
    const request = httpMock.createRequest({
      url: '/posts',
      method: 'POST',
      body: {
        userId: 1,
        password: 'abc',
        title: '프로젝트 진행중',
        content:
          '이번 프로젝트는 게시글 생성, 수정, 삭제 구현을 하는 프로젝트이다.',
      },
    });
    const response = httpMock.createResponse();

    postService.createPost = jest.fn();

    expect(async () => {
      await postController.createPost(request, response);
    }).rejects.toThrowError('INVALID VALUE');
  });
  it('return BadRequestError password에 숫자를 포함하지 않을 경우', async () => {
    const request = httpMock.createRequest({
      url: '/posts',
      method: 'POST',
      body: {
        userId: 1,
        password: 'abcdefg',
        title: '프로젝트 진행중',
        content:
          '이번 프로젝트는 게시글 생성, 수정, 삭제 구현을 하는 프로젝트이다.',
      },
    });
    const response = httpMock.createResponse();

    postService.createPost = jest.fn();

    expect(async () => {
      await postController.createPost(request, response);
    }).rejects.toThrowError(BadRequestException);
  });
  it('return BadRequestError title.length > 20인 경우', async () => {
    const request = httpMock.createRequest({
      url: '/posts',
      method: 'POST',
      body: {
        userId: 1,
        password: 'abcdefg1',
        title: '프로젝트 진행중입니다...............',
        content:
          '이번 프로젝트는 게시글 생성, 수정, 삭제 구현을 하는 프로젝트이다.',
      },
    });
    const response = httpMock.createResponse();

    postService.createPost = jest.fn();

    expect(async () => {
      await postController.createPost(request, response);
    }).rejects.toThrowError(BadRequestException);
  });
  it('return BadRequestError content.length > 200인 경우', async () => {
    const request = httpMock.createRequest({
      url: '/posts',
      method: 'POST',
      body: {
        userId: 1,
        password: 'abcdefg1',
        title: '프로젝트 진행중입니다.',
        content:
          '이번 프로젝트는 게시글 생성, 수정, 삭제 구현을 하는 프로젝트이다.'.repeat(
            10
          ),
      },
    });
    const response = httpMock.createResponse();

    postService.createPost = jest.fn();

    expect(async () => {
      await postController.createPost(request, response);
    }).rejects.toThrowError(BadRequestException);
  });
});
