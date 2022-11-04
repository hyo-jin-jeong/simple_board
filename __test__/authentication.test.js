import * as encryptPassword from '../util/encryptPassword.js';

import { BadRequestException, UnauthorizedException } from '../util/exception';

import authentication from '../middleware/authentication';
import db from '../db/database.js';
import httpMock from 'node-mocks-http';

describe('board authentication test', () => {
  let id, password;
  beforeEach(() => {
    id = 1;
    password = 'dlkajs1';
  });

  it('next() 실행 성공했을 경우', async () => {
    const request = httpMock.createRequest({
      params: { id },
      body: { password },
    });
    const response = httpMock.createResponse();
    const next = jest.fn();
    db.Post.findById = jest.fn(() => {
      return {
        id,
        password,
      };
    });
    encryptPassword.createEncryptPassword = jest.fn(() => password);
    await authentication(request, response, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith();
  });
  it('BadRequestError password가 없는 경우', async () => {
    const request = httpMock.createRequest({
      params: { id },
    });
    const response = httpMock.createResponse();
    const next = jest.fn();

    expect(async () => {
      await authentication(request, response, next);
    }).rejects.toThrowError(BadRequestException);
  });
  it('BadRequestError post가 없는 경우', async () => {
    const request = httpMock.createRequest({
      params: { id },
      body: { password },
    });
    const response = httpMock.createResponse();
    const next = jest.fn();
    db.Post.findById = jest.fn();

    expect(async () => {
      await authentication(request, response, next);
    }).rejects.toThrowError(BadRequestException);
  });
  it('UnauthorizedError password가 맞지 않는 경우', async () => {
    const request = httpMock.createRequest({
      params: { id },
      body: { password: '안녕' },
    });
    const response = httpMock.createResponse();
    const next = jest.fn();
    db.Post.findById = jest.fn(() => {
      return {
        id,
        password,
      };
    });
    encryptPassword.createEncryptPassword = jest.fn();

    expect(async () => {
      await authentication(request, response, next);
    }).rejects.toThrowError(UnauthorizedException);
  });
});
