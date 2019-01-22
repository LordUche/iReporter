/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHTTP from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import server from '../../server';
import { reset, createAdmin } from '../helpers';
import factory from '../fixtures';

dotenv.config();
chai.use(chaiHTTP);

describe('Red-flag routes', () => {
  const rootUrl = '/api/v1/red-flags';
  let user;
  let user2;
  let admin;
  let token;
  let token2;
  let adminToken;
  let redflag1;
  let redflag;
  let noLocation;
  let noComment;
  let badLocation;
  let badComment;

  before(async () => {
    await reset('users');
    await reset('incidents');
    admin = await createAdmin();
    adminToken = jwt.sign(admin, process.env.JWT_SECRET);
    [user, user2] = await factory.attrsMany('user', 2);
    const res = await chai
      .request(server)
      .post('/api/v1/auth/signup')
      .send(user);
    const res2 = await chai
      .request(server)
      .post('/api/v1/auth/signup')
      .send(user2);

    // eslint-disable-next-line prefer-destructuring
    token = res.body.data[0].token;
    token2 = res2.body.data[0].token;
    redflag = await factory.build('red-flag');
    noLocation = await factory.build('red-flag', { location: undefined });
    badLocation = await factory.build('red-flag', { location: 'bad' });
    noComment = await factory.build('red-flag', { comment: undefined });
    badComment = await factory.build('red-flag', { comment: 'sh' });
  });

  after(async () => {
    await reset('users');
    await reset('incidents');
    await factory.cleanUp();
  });

  describe('POST /red-flags', () => {
    it('should create a red-flag', (done) => {
      chai
        .request(server)
        .post(rootUrl)
        .set({ 'access-token': token })
        .send(redflag)
        .end((err, res) => {
          [redflag1] = res.body.data;
          const { status, data, errors } = res.body;
          expect(res).to.have.status(201);
          expect(status).to.equal(res.statusCode);
          expect(errors).to.not.exist;
          expect(data).to.be.an('Array');
          expect(data[0].id).to.be.a('number');
          expect(data[0].message).to.equal('Created red-flag record');
          done(err);
        });
    });

    it('should not create a red-flag if the user is not signed in', (done) => {
      chai
        .request(server)
        .post(rootUrl)
        .send(redflag)
        .end((err, res) => {
          const { status, error, data } = res.body;
          expect(res).to.have.status(401);
          expect(status).to.equal(res.statusCode);
          expect(data).to.not.exist;
          expect(error).to.be.a('string');
          done(err);
        });
    });

    it('should not create a red-flag record without a location', (done) => {
      chai
        .request(server)
        .post(rootUrl)
        .set({ 'access-token': token })
        .send(noLocation)
        .end((err, res) => {
          const { status, errors, data } = res.body;
          expect(res).to.have.status(400);
          expect(status).to.equal(res.statusCode);
          expect(data).to.not.exist;
          expect(errors).to.be.an('Array').and.not.be.empty;
          done(err);
        });
    });

    it('should not create a red-flag record without a comment', (done) => {
      chai
        .request(server)
        .post(rootUrl)
        .set({ 'access-token': token })
        .send(noComment)
        .end((err, res) => {
          const { status, errors, data } = res.body;
          expect(res).to.have.status(400);
          expect(status).to.equal(res.statusCode);
          expect(data).to.not.exist;
          expect(errors).to.be.an('Array').and.not.be.empty;
          done(err);
        });
    });

    it('should not create a red-flag record with an invalid location', (done) => {
      chai
        .request(server)
        .post(rootUrl)
        .set({ 'access-token': token })
        .send(badLocation)
        .end((err, res) => {
          const { status, errors, data } = res.body;
          expect(res).to.have.status(400);
          expect(status).to.equal(res.statusCode);
          expect(data).to.not.exist;
          expect(errors).to.be.an('Array').and.not.be.empty;
          done(err);
        });
    });

    it('should not create a red-flag record with an invalid comment', (done) => {
      chai
        .request(server)
        .post(rootUrl)
        .set({ 'access-token': token })
        .send(badComment)
        .end((err, res) => {
          const { status, errors, data } = res.body;
          expect(res).to.have.status(400);
          expect(status).to.equal(res.statusCode);
          expect(data).to.not.exist;
          expect(errors).to.be.an('Array').and.not.be.empty;
          done(err);
        });
    });

    it('should not create a red-flag record if the logged in user is an admin', (done) => {
      chai
        .request(server)
        .post(rootUrl)
        .set({ 'access-token': adminToken })
        .send(redflag)
        .end((err, res) => {
          const { status, error, data } = res.body;
          expect(res).to.have.status(403);
          expect(status).to.equal(res.statusCode);
          expect(data).to.not.exist;
          expect(error).to.be.a('string');
          done(err);
        });
    });
  });

  describe('GET /red-flags', () => {
    it('should get all red-flags created by the logged in non-admin user', (done) => {
      chai
        .request(server)
        .get(rootUrl)
        .set({ 'access-token': token })
        .end((err, res) => {
          const { status, error, data } = res.body;
          expect(res).to.have.status(200);
          expect(status).to.equal(res.statusCode);
          expect(error).to.not.exist;
          expect(data)
            .to.be.an('Array')
            .and.have.length(1);
          done(err);
        });
    });

    it('should get all red-flags created by the logged in non-admin user', (done) => {
      chai
        .request(server)
        .get(rootUrl)
        .set({ 'access-token': token2 })
        .end((err, res) => {
          const { status, error, data } = res.body;
          expect(res).to.have.status(200);
          expect(status).to.equal(res.statusCode);
          expect(error).to.not.exist;
          expect(data)
            .to.be.an('Array')
            .and.have.length(0);
          done(err);
        });
    });

    it('should get all red-flags created by all users if the logged in user is an admin', (done) => {
      chai
        .request(server)
        .get(rootUrl)
        .set({ 'access-token': adminToken })
        .end((err, res) => {
          const { status, error, data } = res.body;
          expect(res).to.have.status(200);
          expect(status).to.equal(res.statusCode);
          expect(error).to.not.exist;
          expect(data)
            .to.be.an('Array')
            .and.have.length(1);
          done(err);
        });
    });

    it('should not get all red-flags if the user is not logged in', (done) => {
      chai
        .request(server)
        .get(rootUrl)
        .end((err, res) => {
          const { status, error, data } = res.body;
          expect(res).to.have.status(401);
          expect(status).to.equal(res.statusCode);
          expect(error).to.be.a('string');
          expect(data).to.not.exist;
          done(err);
        });
    });
  });

  describe('GET /red-flags/:id', () => {
    it('should find a red-flag that exists', (done) => {
      chai
        .request(server)
        .get(`${rootUrl}/${redflag1.id}`)
        .set({ 'access-token': token })
        .end((err, res) => {
          const { status, data, error } = res.body;
          expect(res).to.have.status(200);
          expect(status).to.equal(res.statusCode);
          expect(data).to.be.an('Array');
          expect(data[0].id).to.equal(redflag1.id);
          expect(error).to.not.exist;
          done(err);
        });
    });

    it('should not find a red-flag if the user is not logged in', (done) => {
      chai
        .request(server)
        .get(`${rootUrl}/${redflag1.id}`)
        .end((err, res) => {
          const { status, data, error } = res.body;
          expect(res).to.have.status(401);
          expect(status).to.equal(res.statusCode);
          expect(data).to.be.undefined;
          expect(error).to.be.a('string');
          done(err);
        });
    });

    it('should not find a red-flag that was created by another user', (done) => {
      chai
        .request(server)
        .get(`${rootUrl}/${redflag1.id}`)
        .set({ 'access-token': token2 })
        .end((err, res) => {
          const { status, data, error } = res.body;
          expect(res).to.have.status(403);
          expect(status).to.equal(res.statusCode);
          expect(data).to.be.undefined;
          expect(error).to.be.a('string');
          done(err);
        });
    });

    it('should not find a red-flag that does not exist', (done) => {
      chai
        .request(server)
        .get(`${rootUrl}/0`)
        .set({ 'access-token': token })
        .end((err, res) => {
          const { status, data, error } = res.body;
          expect(res).to.have.status(500);
          expect(status).to.equal(res.statusCode);
          expect(data).to.be.undefined;
          expect(error).to.be.a('string');
          done();
        });
    });
  });

  describe('PATCH /red-flags/:id/location', () => {
    it("should update a red-flag's location", (done) => {
      chai
        .request(server)
        .patch(`${rootUrl}/${redflag1.id}/location`)
        .set({ 'access-token': token })
        .send({ location: '-2.333321, 12.288399' })
        .end((err, res) => {
          const { status, error, data } = res.body;
          expect(res).to.have.status(200);
          expect(status).to.equal(res.statusCode);
          expect(error).to.not.exist;
          expect(data).to.be.an('Array');
          expect(data[0].id).to.equal(redflag1.id);
          expect(data[0].message).to.equal("Updated red-flag record's location");
          done(err);
        });
    });

    it("should not update a red-flag's location without a location", (done) => {
      chai
        .request(server)
        .patch(`${rootUrl}/${redflag1.id}/location`)
        .set({ 'access-token': token })
        .send({})
        .end((err, res) => {
          const { status, errors, data } = res.body;
          expect(res).to.have.status(400);
          expect(status).to.equal(res.statusCode);
          expect(errors).to.be.an('Array').and.not.be.empty;
          expect(data).to.not.exist;
          done(err);
        });
    });

    it("should not update a red-flag's location with an invalid location", (done) => {
      chai
        .request(server)
        .patch(`${rootUrl}/${redflag1.id}/location`)
        .set({ 'access-token': token })
        .send({ location: 'invalid' })
        .end((err, res) => {
          const { status, errors, data } = res.body;
          expect(res).to.have.status(400);
          expect(status).to.equal(res.statusCode);
          expect(errors).to.be.an('Array').and.not.be.empty;
          expect(data).to.not.exist;
          done(err);
        });
    });

    it("should not update a red-flag that doesn't exist", (done) => {
      chai
        .request(server)
        .patch(`${rootUrl}/0/location`)
        .set({ 'access-token': token })
        .send({ location: '-2.333321, 12.288399' })
        .end((err, res) => {
          const { status, error, data } = res.body;
          expect(res).to.have.status(500);
          expect(status).to.equal(res.statusCode);
          expect(error).to.be.a('string');
          expect(data).to.not.exist;
          done(err);
        });
    });

    it("should not update a red-flag's location if the user is not logged in", (done) => {
      chai
        .request(server)
        .patch(`${rootUrl}/${redflag1.id}/location`)
        .send({ location: '-2.333321, 12.288399' })
        .end((err, res) => {
          const { status, error, data } = res.body;
          expect(res).to.have.status(401);
          expect(status).to.equal(res.statusCode);
          expect(error).to.be.a('string');
          expect(data).to.not.exist;
          done(err);
        });
    });

    it('should not update a red-flag created by another user', (done) => {
      chai
        .request(server)
        .patch(`${rootUrl}/${redflag1.id}/location`)
        .set({ 'access-token': token2 })
        .send({ location: '-2.333321, 12.288399' })
        .end((err, res) => {
          const { status, error, data } = res.body;
          expect(res).to.have.status(403);
          expect(status).to.equal(res.statusCode);
          expect(error).to.be.a('string');
          expect(data).to.not.exist;
          done(err);
        });
    });
  });

  describe('PATCH /red-flags/:id/comment', () => {
    it("should update a red-flag's comment", (done) => {
      chai
        .request(server)
        .patch(`${rootUrl}/${redflag1.id}/comment`)
        .set({ 'access-token': token })
        .send({ comment: 'Bribery in Wuse II, Abuja' })
        .end((err, res) => {
          const { status, error, data } = res.body;
          expect(res).to.have.status(200);
          expect(status).to.equal(res.statusCode);
          expect(error).to.not.exist;
          expect(data).to.be.an('Array');
          expect(data[0].id).to.equal(redflag1.id);
          expect(data[0].message).to.equal("Updated red-flag record's comment");
          done(err);
        });
    });

    it("should not update a red-flag's comment without a comment", (done) => {
      chai
        .request(server)
        .patch(`${rootUrl}/${redflag1.id}/comment`)
        .set({ 'access-token': token })
        .send({})
        .end((err, res) => {
          const { status, errors, data } = res.body;
          expect(res).to.have.status(400);
          expect(status).to.equal(res.statusCode);
          expect(errors).to.be.an('Array').and.not.be.empty;
          expect(data).to.not.exist;
          done(err);
        });
    });

    it("should not update a red-flag's comment with an invalid comment", (done) => {
      chai
        .request(server)
        .patch(`${rootUrl}/${redflag1.id}/comment`)
        .set({ 'access-token': token })
        .send({ comment: 'in' })
        .end((err, res) => {
          const { status, errors, data } = res.body;
          expect(res).to.have.status(400);
          expect(status).to.equal(res.statusCode);
          expect(errors).to.be.an('Array').and.not.be.empty;
          expect(data).to.not.exist;
          done(err);
        });
    });

    it("should not update a red-flag that doesn't exist", (done) => {
      chai
        .request(server)
        .patch(`${rootUrl}/0/comment`)
        .set({ 'access-token': token })
        .send({ comment: 'Bribery in Wuse II, Abuja' })
        .end((err, res) => {
          const { status, error, data } = res.body;
          expect(res).to.have.status(500);
          expect(status).to.equal(res.statusCode);
          expect(error).to.be.a('string');
          expect(data).to.not.exist;
          done(err);
        });
    });

    it("should not update a red-flag's comment if the user is not logged in", (done) => {
      chai
        .request(server)
        .patch(`${rootUrl}/${redflag1.id}/comment`)
        .send({ comment: 'Bribery in Wuse II, Abuja' })
        .end((err, res) => {
          const { status, error, data } = res.body;
          expect(res).to.have.status(401);
          expect(status).to.equal(res.statusCode);
          expect(error).to.be.a('string');
          expect(data).to.not.exist;
          done(err);
        });
    });

    it('should not update a red-flag created by another user', (done) => {
      chai
        .request(server)
        .patch(`${rootUrl}/${redflag1.id}/comment`)
        .set({ 'access-token': token2 })
        .send({ comment: 'Bribery in Wuse II, Abuja' })
        .end((err, res) => {
          const { status, error, data } = res.body;
          expect(res).to.have.status(403);
          expect(status).to.equal(res.statusCode);
          expect(error).to.be.a('string');
          expect(data).to.not.exist;
          done(err);
        });
    });
  });

  describe('PATCH /red-flags/:id/status', () => {
    it("should not update a red-flag's status if the logged in user is not an admin", (done) => {
      chai
        .request(server)
        .patch(`${rootUrl}/${redflag1.id}/status`)
        .set({ 'access-token': token })
        .send({ status: 'resolved' })
        .end((err, res) => {
          const { status, data, error } = res.body;
          expect(res).to.have.status(403);
          expect(status).to.equal(res.statusCode);
          expect(data).to.not.exist;
          expect(error).to.be.a('string');
          done(err);
        });
    });

    it("should update a red-flag's status", (done) => {
      chai
        .request(server)
        .patch(`${rootUrl}/${redflag1.id}/status`)
        .set({ 'access-token': adminToken })
        .send({ status: 'under investigation' })
        .end((err, res) => {
          const { status, error, data } = res.body;
          expect(res).to.have.status(200);
          expect(status).to.equal(res.statusCode);
          expect(error).to.not.exist;
          expect(data).to.be.an('Array');
          expect(data[0].id).to.equal(redflag1.id);
          expect(data[0].message).to.equal("Updated red-flag record's status");
          done(err);
        });
    });

    it("should not update a red-flag's status without a status", (done) => {
      chai
        .request(server)
        .patch(`${rootUrl}/${redflag1.id}/status`)
        .set({ 'access-token': adminToken })
        .send({})
        .end((err, res) => {
          const { status, errors, data } = res.body;
          expect(res).to.have.status(400);
          expect(status).to.equal(res.statusCode);
          expect(errors).to.be.an('Array').and.not.be.empty;
          expect(data).to.not.exist;
          done(err);
        });
    });

    it("should not update a red-flag's status with an invalid status", (done) => {
      chai
        .request(server)
        .patch(`${rootUrl}/${redflag1.id}/status`)
        .set({ 'access-token': adminToken })
        .send({ status: 'seen' })
        .end((err, res) => {
          const { status, errors, data } = res.body;
          expect(res).to.have.status(400);
          expect(status).to.equal(res.statusCode);
          expect(errors).to.be.an('Array').and.not.be.empty;
          expect(data).to.not.exist;
          done(err);
        });
    });

    it("should not update a red-flag that doesn't exist", (done) => {
      chai
        .request(server)
        .patch(`${rootUrl}/0/status`)
        .set({ 'access-token': adminToken })
        .send({ status: 'under investigation' })
        .end((err, res) => {
          const { status, error, data } = res.body;
          expect(res).to.have.status(500);
          expect(status).to.equal(res.statusCode);
          expect(error).to.be.a('string');
          expect(data).to.not.exist;
          done(err);
        });
    });

    it("should not update a red-flag's status if the user is not logged in", (done) => {
      chai
        .request(server)
        .patch(`${rootUrl}/${redflag1.id}/status`)
        .send({ status: 'rejected' })
        .end((err, res) => {
          const { status, error, data } = res.body;
          expect(res).to.have.status(401);
          expect(status).to.equal(res.statusCode);
          expect(error).to.be.a('string');
          expect(data).to.not.exist;
          done(err);
        });
    });
  });

  describe('DELETE /red-flags/:id', () => {
    it('should not delete a red-flag created by another user', (done) => {
      chai
        .request(server)
        .delete(`${rootUrl}/${redflag1.id}`)
        .set({ 'access-token': token2 })
        .end((err, res) => {
          const { status, error, data } = res.body;
          expect(res).to.have.status(403);
          expect(status).to.equal(res.statusCode);
          expect(error).to.be.a('string');
          expect(data).to.not.exist;
          done(err);
        });
    });

    it('should not delete a red-flag if the user is not logged in', (done) => {
      chai
        .request(server)
        .delete(`${rootUrl}/${redflag1.id}`)
        .end((err, res) => {
          const { status, data, error } = res.body;
          expect(res).to.have.status(401);
          expect(status).to.equal(res.statusCode);
          expect(data).to.be.undefined;
          expect(error).to.be.a('string');
          done(err);
        });
    });

    it('should not delete a red-flag that does not exist', (done) => {
      chai
        .request(server)
        .delete(`${rootUrl}/0`)
        .set({ 'access-token': token })
        .end((err, res) => {
          const { status, data, error } = res.body;
          expect(res).to.have.status(500);
          expect(status).to.equal(res.statusCode);
          expect(data).to.be.undefined;
          expect(error).to.be.a('string');
          done(err);
        });
    });

    it('should delete a red-flag that exists', (done) => {
      chai
        .request(server)
        .delete(`${rootUrl}/${redflag1.id}`)
        .set({ 'access-token': token })
        .end((err, res) => {
          console.log(res.body);
          const { status, data, error } = res.body;
          expect(res).to.have.status(200);
          expect(status).to.equal(res.statusCode);
          expect(data).to.be.an('Array');
          expect(data[0].id).to.equal(redflag1.id);
          expect(data[0].message).to.equal('Deleted red-flag record');
          expect(error).to.not.exist;
          done(err);
        });
    });
  });
});
