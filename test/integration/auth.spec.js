/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHTTP from 'chai-http';
import { reset } from '../helpers';
import factory from '../fixtures';
import server from '../../server';

chai.use(chaiHTTP);

describe('Auth routes', () => {
  const rootUrl = '/api/v1/auth';
  let user;
  let existingEmail;
  let existingUsername;
  let noFirstname;
  let noLastname;
  let noEmail;
  let noUsername;
  let noPassword;
  let badEmail;
  let badPassword;
  let badUsername;
  let badCountry;
  let badPhoneNumber;
  let phoneWithoutCountry;

  before(async () => {
    await reset('users');
    user = await factory.attrs('user');
    existingEmail = await factory.attrs('user', { email: user.email });
    existingUsername = await factory.attrs('user', { username: user.username });
    noFirstname = await factory.attrs('user', { firstname: undefined });
    noLastname = await factory.attrs('user', { lastname: undefined });
    noEmail = await factory.attrs('user', { email: undefined });
    noUsername = await factory.attrs('user', { username: undefined });
    noPassword = await factory.attrs('user', { password: undefined });
    badEmail = await factory.attrs('user', { email: 'verybademailformat' });
    badUsername = await factory.attrs('user', { username: 'yo' });
    badPassword = await factory.attrs('user', { password: 'short' });
    badCountry = await factory.attrs('user', { country: 'invalid' });
    badPhoneNumber = await factory.attrs('user', { phonenumber: '0701497083', country: 'NG' });
    phoneWithoutCountry = await factory.attrs('user', { country: undefined });
  });

  after(async () => {
    await reset('users');
    factory.cleanUp();
  });

  describe('signup', () => {
    const baseUrl = `${rootUrl}/signup`;
    it('should signup a user', (done) => {
      chai
        .request(server)
        .post(baseUrl)
        .send(user)
        .end((err, res) => {
          const { status, data } = res.body;
          expect(res.statusCode).to.equal(201);
          expect(status).to.equal(201);
          expect(data).to.be.an('Array').and.to.have.length(1);
          expect(data[0].token).to.be.a('string');
          expect(data[0].user).to.be.an('object');
          expect(data[0].user.id).to.be.a('number');
          done(err);
        });
    });

    it('should not signup a user with an existing email', (done) => {
      chai
        .request(server)
        .post(baseUrl)
        .send(existingEmail)
        .end((err, res) => {
          const { status, data, error } = res.body;
          expect(res.statusCode).to.equal(500);
          expect(status).to.equal(res.statusCode);
          expect(data).to.not.exist;
          expect(error)
            .to.be.a('string')
            .and.to.contain('email');
          done(err);
        });
    });

    it('should not signup a user with an existing username', (done) => {
      chai
        .request(server)
        .post(baseUrl)
        .send(existingUsername)
        .end((err, res) => {
          const { status, data, error } = res.body;
          expect(res.statusCode).to.equal(500);
          expect(status).to.equal(res.statusCode);
          expect(data).to.not.exist;
          expect(error)
            .to.be.a('string')
            .and.to.contain('username');
          done(err);
        });
    });

    it('should not signup a user with an invalid email', (done) => {
      chai
        .request(server)
        .post(baseUrl)
        .send(badEmail)
        .end((err, res) => {
          const { status, errors, data } = res.body;
          expect(res.statusCode).to.equal(400);
          expect(status).to.equal(res.statusCode);
          expect(data).to.not.exist;
          expect(errors).to.be.an('Array').and.to.not.be.empty;
          done(err);
        });
    });

    it('should not signup a user with an invalid username', (done) => {
      chai
        .request(server)
        .post(baseUrl)
        .send(badUsername)
        .end((err, res) => {
          const { status, errors, data } = res.body;
          expect(res.statusCode).to.equal(400);
          expect(status).to.equal(res.statusCode);
          expect(data).to.not.exist;
          expect(errors).to.be.an('Array').and.to.not.be.empty;
          done(err);
        });
    });

    it('should not signup a user with an invalid password', (done) => {
      chai
        .request(server)
        .post(baseUrl)
        .send(badPassword)
        .end((err, res) => {
          const { status, errors, data } = res.body;
          expect(res.statusCode).to.equal(400);
          expect(status).to.equal(res.statusCode);
          expect(data).to.not.exist;
          expect(errors).to.be.an('Array').and.to.not.be.empty;
          done(err);
        });
    });

    it('should not signup a user with an invalid country code', (done) => {
      chai
        .request(server)
        .post(baseUrl)
        .send(badCountry)
        .end((err, res) => {
          const { status, errors, data } = res.body;
          expect(res.statusCode).to.equal(400);
          expect(status).to.equal(res.statusCode);
          expect(data).to.not.exist;
          expect(errors).to.be.an('Array').and.to.not.be.empty;
          done(err);
        });
    });

    it('should not signup a user with an invalid phone number', (done) => {
      chai
        .request(server)
        .post(baseUrl)
        .send(badPhoneNumber)
        .end((err, res) => {
          const { status, error, data } = res.body;
          expect(res.statusCode).to.equal(400);
          expect(status).to.equal(res.statusCode);
          expect(data).to.not.exist;
          expect(error).to.be.a('string').and.to.contain('phone number');
          done(err);
        });
    });

    it('should not signup a user with a phone number but without a country code', (done) => {
      chai
        .request(server)
        .post(baseUrl)
        .send(phoneWithoutCountry)
        .end((err, res) => {
          const { status, errors, data } = res.body;
          expect(res.statusCode).to.equal(400);
          expect(status).to.equal(res.statusCode);
          expect(data).to.not.exist;
          expect(errors).to.be.an('Array').and.to.not.be.empty;
          done(err);
        });
    });

    it('should not signup a user without a first name', (done) => {
      chai
        .request(server)
        .post(baseUrl)
        .send(noFirstname)
        .end((err, res) => {
          const { status, errors, data } = res.body;
          expect(res.statusCode).to.equal(400);
          expect(status).to.equal(res.statusCode);
          expect(data).to.not.exist;
          expect(errors).to.be.an('Array').and.to.not.be.empty;
          done(err);
        });
    });

    it('should not signup a user without a last name', (done) => {
      chai
        .request(server)
        .post(baseUrl)
        .send(noLastname)
        .end((err, res) => {
          const { status, errors, data } = res.body;
          expect(res.statusCode).to.equal(400);
          expect(status).to.equal(res.statusCode);
          expect(data).to.not.exist;
          expect(errors).to.be.an('Array').and.to.not.be.empty;
          done(err);
        });
    });

    it('should not signup a user without an email', (done) => {
      chai
        .request(server)
        .post(baseUrl)
        .send(noEmail)
        .end((err, res) => {
          const { status, errors, data } = res.body;
          expect(res.statusCode).to.equal(400);
          expect(status).to.equal(res.statusCode);
          expect(data).to.not.exist;
          expect(errors).to.be.an('Array').and.to.not.be.empty;
          done(err);
        });
    });

    it('should not signup a user without a username', (done) => {
      chai
        .request(server)
        .post(baseUrl)
        .send(noUsername)
        .end((err, res) => {
          const { status, errors, data } = res.body;
          expect(res.statusCode).to.equal(400);
          expect(status).to.equal(res.statusCode);
          expect(data).to.not.exist;
          expect(errors).to.be.an('Array').and.to.not.be.empty;
          done(err);
        });
    });

    it('should not signup a user without a password', (done) => {
      chai
        .request(server)
        .post(baseUrl)
        .send(noPassword)
        .end((err, res) => {
          const { status, errors, data } = res.body;
          expect(res.statusCode).to.equal(400);
          expect(status).to.equal(res.statusCode);
          expect(data).to.not.exist;
          expect(errors).to.be.an('Array').and.to.not.be.empty;
          done(err);
        });
    });
  });

  describe('login', () => {
    const baseUrl = `${rootUrl}/login`;
    it('should login a user', (done) => {
      const { email, password } = user;
      chai
        .request(server)
        .post(baseUrl)
        .send({ email, password })
        .end((err, res) => {
          const { status, data } = res.body;
          expect(res.statusCode).to.equal(200);
          expect(status).to.equal(res.statusCode);
          expect(data).to.be.an('Array');
          expect(data[0].token).to.be.a('string');
          expect(data[0].user).to.be.an('object');
          expect(data[0].user.id).to.be.a('number');
          done(err);
        });
    });

    it('should not login a user with an invalid email', (done) => {
      chai
        .request(server)
        .post(baseUrl)
        .send({ email: 'invalidemail', password: '123456' })
        .end((err, res) => {
          const { status, data, errors } = res.body;
          expect(res.statusCode).to.equal(400);
          expect(status).to.equal(res.statusCode);
          expect(data).to.not.exist;
          expect(errors).to.be.an('Array').and.to.not.be.empty;
          done(err);
        });
    });

    it('should not login a user with an invalid password', (done) => {
      chai
        .request(server)
        .post(baseUrl)
        .send({ email: 'validemail@example.com', password: '123' })
        .end((err, res) => {
          const { status, data, errors } = res.body;
          expect(res.statusCode).to.equal(400);
          expect(status).to.equal(res.statusCode);
          expect(data).to.not.exist;
          expect(errors).to.be.an('Array').and.to.not.be.empty;
          done(err);
        });
    });

    it('should not login a user without an email', (done) => {
      chai
        .request(server)
        .post(baseUrl)
        .send({ password: '123456' })
        .end((err, res) => {
          const { status, data, errors } = res.body;
          expect(res.statusCode).to.equal(400);
          expect(status).to.equal(res.statusCode);
          expect(data).to.not.exist;
          expect(errors).to.be.an('Array').and.to.not.be.empty;
          done(err);
        });
    });

    it('should not login a user without a password', (done) => {
      chai
        .request(server)
        .post(baseUrl)
        .send({ email: 'validemail2@example.com' })
        .end((err, res) => {
          const { status, data, errors } = res.body;
          expect(res.statusCode).to.equal(400);
          expect(status).to.equal(res.statusCode);
          expect(data).to.not.exist;
          expect(errors).to.be.an('Array').and.to.not.be.empty;
          done(err);
        });
    });

    it('should not login a user with an incorrect password', (done) => {
      chai
        .request(server)
        .post(baseUrl)
        .send({ email: user.email, password: 'incorrect' })
        .end((err, res) => {
          const { status, data, error } = res.body;
          expect(res).to.have.status(422);
          expect(status).to.equal(res.statusCode);
          expect(error).to.be.a('string');
          expect(data).to.be.undefined;
          done(err);
        });
    });

    it('should not login a user that is not registered', (done) => {
      chai
        .request(server)
        .post(baseUrl)
        .send({ email: 'stranger@example.com', password: '123456' })
        .end((err, res) => {
          const { status, error, data } = res.body;
          expect(res).to.have.status(500);
          expect(status).to.equal(res.statusCode);
          expect(error).to.be.a('string');
          expect(data).to.be.undefined;
          done(err);
        });
    });
  });
});
