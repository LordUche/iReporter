/* eslint-disable no-unused-expressions */
import dotenv from 'dotenv';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src/app';
import { hashPassword, signToken } from '../../src/utils/helpers';
import { deleteAll } from '../../src/utils/database/queries/queries';
import RedFlagsQuery from '../../src/utils/database/queries/red-flags.queries';
import UsersQuery from '../../src/utils/database/queries/users.queries';


dotenv.config();
process.env.NODE_ENV = 'test';

chai.use(chaiHttp);

describe('API V1 Routes', () => {
  const rootUrl = '/api/v1';

  describe('Red-flags', () => {
    const baseUrl = `${rootUrl}/red-flags`;
    const type = 'red-flag';
    let createdBy;
    let token;
    let good;

    before(async () => {
      await deleteAll('incidents');
      await deleteAll('users');
      const data = await UsersQuery.create({
        firstname: 'Uchenna',
        lastname: 'Iheanacho',
        othernames: 'Andrew',
        email: 'uchennai@live.com',
        phoneNumber: '08099851353',
        username: 'lorduche',
        passwordHash: hashPassword('123456'),
      });
      token = signToken(data);
      createdBy = data.id;
      good = {
        location: '7.7153986, 8.5085987',
        status: 'under investigation',
        comment: 'Money laundry in High-level, Makurdi',
        createdOn: '2018-02-15T00:00:00.000Z',
        Images: [],
        Videos: [],
        type,
        createdBy,
      };
    });

    describe('GET /red-flags', () => {
      it('should get all red-flag records', async () => {
        await RedFlagsQuery.create(good);
        await RedFlagsQuery.create(good);

        chai
          .request(server)
          .get(baseUrl)
          .set('access-token', token)
          .send()
          .end((err, res) => {
            expect(res.statusCode).to.eq(200);
            expect(res.headers['content-type']).to.contain('application/json');
            expect(res.body.status).to.eq(200);
            expect(res.body.data).to.be.an('Array');
            expect(res.body.data.length).to.be.gte(2);
            res.body.data.forEach((item) => {
              expect(item.type).to.eq('red-flag');
            });
          });
      });
    });

    describe('GET /red-flags/:id', () => {
      let redFlag;
      before(async () => {
        redFlag = await RedFlagsQuery.create(good);
      });

      it('should get a specific red-flag record', async () => {
        chai
          .request(server)
          .get(`${baseUrl}/${redFlag.id}`)
          .set('access-token', token)
          .send()
          .end((err, res) => {
            expect(res.statusCode).to.eq(200);
            expect(res.headers['content-type']).to.contain('application/json');
            expect(res.body.status).to.eq(200);
            expect(res.body.data[0].id).to.eq(redFlag.id);
          });
      });

      it('should throw error if the record is not found', (done) => {
        chai
          .request(server)
          .get(`${baseUrl}/999`)
          .set('access-token', token)
          .send()
          .end((err, res) => {
            expect(res.statusCode).to.eq(500);
            expect(res.headers['content-type']).to.contain('application/json');
            expect(res.body.status).to.eq(500);
            expect(res.body.data).to.be.undefined;
            expect(res.body.error).to.be.a('string');
            done();
          });
      });
    });

    describe('POST /red-flags', () => {
      it('should create a new red-flag record', (done) => {
        chai
          .request(server)
          .post(baseUrl)
          .set('access-token', token)
          .send(good)
          .end((err, res) => {
            expect(res.statusCode).to.eq(201);
            expect(res.headers['content-type']).to.contain('application/json');
            expect(res.body.status).to.eq(201);
            expect(res.body.data[0].id).not.to.be.undefined;
            expect(res.body.data[0].message).to.contain('Created red-flag record');
            done();
          });
      });

      it('should throw error if the request body is invalid', (done) => {
        const redFlag = {
          location: '',
          comment: 'Hello',
        };
        chai
          .request(server)
          .post(baseUrl)
          .set('access-token', token)
          .send(redFlag)
          .end((err, res) => {
            expect(res.statusCode).to.eq(400);
            expect(res.headers['content-type']).to.contain('application/json');
            expect(res.body.status).to.eq(400);
            expect(res.body.data).to.be.undefined;
            expect(res.body.error).to.be.a('string');
            done();
          });
      });
    });

    describe('PATCH /red-flags/:id/location', () => {
      let redFlag;

      before(async () => {
        redFlag = await RedFlagsQuery.create(good);
      });

      it('should update the location of a specific red-flag record', (done) => {
        const location = { location: '7.7153984, 8.5085982' };

        chai
          .request(server)
          .patch(`${baseUrl}/${redFlag.id}/location`)
          .set('access-token', token)
          .send(location)
          .end((err, res) => {
            expect(res.statusCode).to.eq(200);
            expect(res.headers['content-type']).to.contain('application/json');
            expect(res.body.status).to.eq(200);
            expect(res.body.data[0].id).to.eq(redFlag.id);
            expect(res.body.data[0].message).to.eq("Updated red-flag record's location");
            done();
          });
      });

      it('should throw error if the record is not found', (done) => {
        const location = { location: '7.7153984, 8.5085982' };

        chai
          .request(server)
          .patch(`${baseUrl}/999/location`)
          .set('access-token', token)
          .send(location)
          .end((err, res) => {
            expect(res.statusCode).to.eq(500);
            expect(res.headers['content-type']).to.contain('application/json');
            expect(res.body.status).to.eq(500);
            expect(res.body.data).to.be.undefined;
            expect(res.body.error).to.be.a('string');
            done();
          });
      });
    });

    describe('PATCH /red-flags/:id/comment', () => {
      let redFlag;

      before(async () => {
        redFlag = await RedFlagsQuery.create(good);
      });

      it('should update the comment of a specific red-flag record', (done) => {
        const comment = { comment: 'Corruption in Makurdi town' };

        chai
          .request(server)
          .patch(`${baseUrl}/${redFlag.id}/comment`)
          .set('access-token', token)
          .send(comment)
          .end((err, res) => {
            expect(res.statusCode).to.eq(200);
            expect(res.headers['content-type']).to.contain('application/json');
            expect(res.body.status).to.eq(200);
            expect(res.body.data[0].id).to.eq(redFlag.id);
            expect(res.body.data[0].message).to.eq("Updated red-flag record's comment");
            done();
          });
      });

      it('should throw error if the record is not found', (done) => {
        const comment = { comment: 'Lat: 7.7153984, Lon: 8.5085982' };

        chai
          .request(server)
          .patch(`${baseUrl}/999/comment`)
          .set('access-token', token)
          .send(comment)
          .end((err, res) => {
            expect(res.statusCode).to.eq(500);
            expect(res.headers['content-type']).to.contain('application/json');
            expect(res.body.status).to.eq(500);
            expect(res.body.data).to.be.undefined;
            expect(res.body.error).to.be.a('string');
            done();
          });
      });
    });

    describe('DELETE /red-flags/:id', () => {
      let redFlag;

      before(async () => {
        redFlag = await RedFlagsQuery.create(good);
      });

      it('should delete a specific red-flag record', (done) => {
        chai
          .request(server)
          .delete(`${baseUrl}/${redFlag.id}`)
          .set('access-token', token)
          .end((err, res) => {
            expect(res.statusCode).to.eq(200);
            expect(res.headers['content-type']).to.contain('application/json');
            expect(res.body.status).to.eq(200);
            expect(res.body.data[0].id).to.eq(redFlag.id);
            expect(res.body.data[0].message).to.contain('Deleted red-flag record');
            done();
          });
      });

      it('should throw error if the record is not found', (done) => {
        chai
          .request(server)
          .delete(`${baseUrl}/999`)
          .set('access-token', token)
          .end((err, res) => {
            expect(res.statusCode).to.eq(500);
            expect(res.headers['content-type']).to.contain('application/json');
            expect(res.body.status).to.eq(500);
            expect(res.body.data).to.be.undefined;
            expect(res.body.error).to.be.a('string');
            done();
          });
      });
    });
  });
});
