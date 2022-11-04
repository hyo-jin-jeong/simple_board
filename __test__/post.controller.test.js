import { BadRequestException } from '../util/exception/index.js';
import httpMock from 'node-mocks-http';
import postController from '../controller/post.js';
import postService from '../service/post.js';

describe('post create test', () => {
  it('return 201 성공 할 경우', async () => {
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

    expect(response.statusCode).toBe(201);
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
    const content =
      '이번 프로젝트는 게시글 생성, 수정, 삭제 구현을 하는 프로젝트이다.';
    const request = httpMock.createRequest({
      url: '/posts',
      method: 'POST',
      body: {
        userId: 1,
        password: 'abcdefg1',
        title: '프로젝트 진행중입니다.',
        content: content.repeat(10),
      },
    });
    const response = httpMock.createResponse();

    postService.createPost = jest.fn();

    expect(async () => {
      await postController.createPost(request, response);
    }).rejects.toThrowError(BadRequestException);
  });
});

describe('post list get test', () => {
  it('return 201 성공 할 경우', async () => {
    const request = httpMock.createRequest({
      url: '/posts',
      method: 'GET',
      body: {
        pagination: {
          id: 23,
          createdAt: '2022-11-04T08:23:39.000Z',
        },
      },
    });
    const response = httpMock.createResponse();
    const posts = [
      {
        id: 23,
        title: '프로젝트 진행중',
        content:
          '이번 프로젝트는 게시글 생성, 수정, 삭제 구현을 하는 프로젝트이다.',
        createAt: '2022-11-04T08:23:39.000Z',
        updatedAt: '2022-11-04T08:23:39.000Z',
        userId: 1,
        userName: 'hyojin',
      },
    ];
    postService.getPosts = jest.fn(async () => {
      return posts;
    });
    await postController.getPosts(request, response);
    expect(response.statusCode).toBe(200);
    expect(response._getJSONData().data).toEqual(posts);
  });
});

describe('post update test', () => {
  it('return 200 성공 할 경우', async () => {
    const title = '프로젝트 진행중';
    const content =
      '이번 프로젝트는 게시글 생성, 수정, 삭제 구현을 하는 프로젝트이다.';
    const request = httpMock.createRequest({
      url: '/posts',
      method: 'PUT',
      body: {
        title,
        content,
      },
    });
    const response = httpMock.createResponse();
    postService.updatePost = jest.fn();

    await postController.updatePost(request, response);
    expect(response.statusCode).toBe(200);
    expect(response._getJSONData().message).toBe('UPDATED SUCCESS');
  });
  it('return 400 title.length > 20인 경우', async () => {
    const request = httpMock.createRequest({
      url: '/posts',
      method: 'PUT',
      body: {
        title: '프로젝트 진행중입니다...............',
        content:
          '이번 프로젝트는 게시글 생성, 수정, 삭제 구현을 하는 프로젝트이다.',
      },
    });
    const response = httpMock.createResponse();

    expect(async () => {
      await postController.updatePost(request, response);
    }).rejects.toThrowError(BadRequestException);
  });
  it('return 400 content.length > 200인 경우', async () => {
    const content =
      '이번 프로젝트는 게시글 생성, 수정, 삭제 구현을 하는 프로젝트이다.';
    const request = httpMock.createRequest({
      url: '/posts',
      method: 'PUT',
      body: {
        title: '프로젝트 진행중입니다.',
        content: content.repeat(10),
      },
    });
    const response = httpMock.createResponse();

    expect(async () => {
      await postController.updatePost(request, response);
    }).rejects.toThrowError(BadRequestException);
  });
});
