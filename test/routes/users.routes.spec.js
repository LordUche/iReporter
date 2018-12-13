/* eslint-disable no-unused-expressions */
import dotenv from 'dotenv';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src/app';
import { deleteAll } from '../../src/utils/database/queries/queries';
import UsersQuery from '../../src/utils/database/queries/users.queries';
import { hashPassword } from '../../src/utils/helpers';

dotenv.config();
process.env.NODE_ENV = 'test';

chai.use(chaiHttp);

describe('API V1 Routes', () => {
  const rootUrl = '/api/v1';
  const validUser = {
    firstname: 'Uchenna',
    lastname: 'Iheanacho',
    othernames: 'Andrew',
    email: 'uchennai@live.com',
    phoneNumber: '08099851353',
    username: 'lorduche',
    password: '123456',
  };
  const invalidUser = {
    firstname: 'Uchenna',
    lastname: 'Iheanacho',
    othernames: 'Andrew',
    phoneNumber: '08099851353',
    username: '',
    password: '123456',
  };
  const validCredentials = { email: validUser.email, password: validUser.password };
  const invalidCredentials = { email: 'ako@jsh', password: '' };

  describe('Auth', () => {
    const baseUrl = `${rootUrl}/auth`;

    before(async () => {
      await deleteAll('incidents');
      await deleteAll('users');
    });

    describe('POST /signup', () => {
      it('should create a user with valid request body', (done) => {
        chai
          .request(server)
          .post(`${baseUrl}/signup`)
          .send(validUser)
          .end((err, res) => {
            const { token, user } = res.body.data[0];
            expect(res.statusCode).to.eq(201);
            expect(res.body.data).to.be.an('Array');
            expect(res.body.data.length).to.eq(1);
            expect(token).to.be.a('string');
            expect(user).to.be.an('object');
            expect(user.id).to.be.a('number');
            expect(user.email).to.eq(validUser.email);
            done();
          });
      });

      it('should not create a user with invalid request body', (done) => {
        chai
          .request(server)
          .post(`${baseUrl}/signup`)
          .send(invalidUser)
          .end((err, res) => {
            expect(res.statusCode).to.eq(400);
            expect(res.body.status).to.eq(400);
            expect(res.body.error).to.be.a('string');
            expect(res.body.data).not.to.exist;
            done();
          });
      });
    });

    describe('POST /login', () => {
      it('should sign in a user', (done) => {
        chai
          .request(server)
          .post(`${baseUrl}/login`)
          .send(validCredentials)
          .end((err, res) => {
            const { token, user } = res.body.data[0];
            expect(res.statusCode).to.eq(200);
            expect(res.body.data).to.be.an('Array');
            expect(res.body.data.length).to.eq(1);
            expect(token).to.be.a('string');
            expect(user).to.be.an('object');
            expect(user.id).to.be.a('number');
            expect(user.email).to.eq(validUser.email);
            done();
          });
      });

      it('should not sign in with wrong login credentials', (done) => {
        chai
          .request(server)
          .post(`${baseUrl}/login`)
          .send(invalidCredentials)
          .end((err, res) => {
            expect(res.statusCode).to.eq(400);
            expect(res.body.status).to.eq(400);
            expect(res.body.error).to.be.a('string');
            expect(res.body.data).not.to.exist;
            done();
          });
      });
    });
  });
});
