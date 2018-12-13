/* eslint-disable no-unused-expressions */
import dotenv from 'dotenv';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src/app';
import { hashPassword, signToken } from '../../src/utils/helpers';
import { deleteAll } from '../../src/utils/database/queries/queries';
import InterventionsQuery from '../../src/utils/database/queries/interventions.queries';
import UsersQuery from '../../src/utils/database/queries/users.queries';


dotenv.config();
process.env.NODE_ENV = 'test';

chai.use(chaiHttp);

describe('API V1 Routes', () => {
  const rootUrl = '/api/v1';

  describe('Interventions', () => {
    const baseUrl = `${rootUrl}/interventions`;
    const type = 'intervention';
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

    describe('GET /interventions', () => {
      it('should get all intervention records', async () => {
        await InterventionsQuery.create(good);
        await InterventionsQuery.create(good);

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
              expect(item.type).to.eq('intervention');
            });
          });
      });
    });

    describe('GET /interventions/:id', () => {
      let redFlag;
      before(async () => {
        redFlag = await InterventionsQuery.create(good);
      });

      it('should get a specific intervention record', async () => {
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

    describe('POST /interventions', () => {
      it('should create a new intervention record', (done) => {
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
            expect(res.body.data[0].message).to.contain('Created intervention record');
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

    describe('PATCH /interventions/:id/location', () => {
      let redFlag;

      before(async () => {
        redFlag = await InterventionsQuery.create(good);
      });

      it('should update the location of a specific intervention record', (done) => {
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
            expect(res.body.data[0].message).to.eq("Updated intervention record's location");
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

    describe('PATCH /interventions/:id/comment', () => {
      let redFlag;

      before(async () => {
        redFlag = await InterventionsQuery.create(good);
      });

      it('should update the comment of a specific intervention record', (done) => {
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
            expect(res.body.data[0].message).to.eq("Updated intervention record's comment");
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

    describe('DELETE /interventions/:id', () => {
      let redFlag;

      before(async () => {
        redFlag = await InterventionsQuery.create(good);
      });

      it('should delete a specific intervention record', (done) => {
        chai
          .request(server)
          .delete(`${baseUrl}/${redFlag.id}`)
          .set('access-token', token)
          .end((err, res) => {
            expect(res.statusCode).to.eq(200);
            expect(res.headers['content-type']).to.contain('application/json');
            expect(res.body.status).to.eq(200);
            expect(res.body.data[0].id).to.eq(redFlag.id);
            expect(res.body.data[0].message).to.contain('Deleted intervention record');
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
